---
title: Authentication
description: Extracting authentication tokens from the League of Legends client
order: 0
---

## 🤔 What are Credentials?

`Credentials` are just authentication tokens. They are used to construct absolute URLs and the headers we need to make requests with the LCU.

## 🗝️ Authentication

### Under the Hood

Because it's possible (and likely) that League of Legends is not installed on a `C:\` drive, Hexgate uses what's known as "the process list method". There is a downside to this approach; the client must be running.

On Windows systems, we run this powershell script:

```ps1
Get-CimInstance -className Win32_Process | Where-Object Name -Like "LeagueClientUx*" | Select-Object CommandLine -First 1 | Format-List
```

In MacOs:

```bash
ps -A | grep LeagueClientUx
```

In Linux:

```bash
ps -Af | grep LeagueClient.ex
```

In both cases we're asking your operating system for a list of running processes and their [command-line arguments](https://en.wikipedia.org/wiki/Command-line_interface#Arguments) and then filtering out anything unrelated to the client. Finally we extract the following credentials from the string/buffer:

| Argument                | Alias               | Type     | Description                                                                 |
| :---------------------- | :------------------ | :------- | :-------------------------------------------------------------------------- |
| "--app-pid"             | `appPid`            | `number` | The client process id (unused)                                              |
| "--app-port"            | `appPort`           | `number` | The port exposed by the LCU. Used by [`Hexgate`]()                          |
| "--remoting-auth-token" | `remotingAuthToken` | `string` | The password header used by [`createHeaders`]() and [`createRequestInit`]() |

## 📚 In Practice

Hexgate does all of this for you via the [`auth()`]() function.

### Example 1. Try authenticating and throw an error immediately if the client isn't found

```ts
import { auth } from "hexgate";

const credentials = await auth();
```

It does not require any arguments by default, but you may pass a configuration object following this type signature:

```ts
/**
 * Options for the `auth` function.
 *
 * By default, the public certificate will be used, but you may provide your own.
 *
 * Alternatively, you can force "unsafe" authentication by explicitly setting `certificate` to `undefined`.
 */
export type AuthOptions<Cert extends string | undefined = typeof CERTIFICATE> =
  {
    certificate?: Cert;
  };
```

## 🏓 Polling

If you'd like to wait for the client to start, you can use the [`poll()`]() utility function. Its type signature is as follows:

```ts
/**
 * Retry a function until an error is not thrown.
 * @param fn - The function to retry.
 * @param interval - The interval in milliseconds to wait between retries.
 * @param max - The maximum number of retries. If undefined, will retry indefinitely.
 * @param onRetry - A function to execute after each failed attempt.
 */
export declare function poll<T>(
  fn: () => Promise<T>,
  interval?: number,
  max?: number,
  onRetry?: () => void
): Promise<T>;
```

### Example 2. Try every 5 seconds up to 5 times and do nothing between each attempt

```ts
import { auth, poll } from "hexgate";

const credentials = await poll(auth);
```

### Example 3. Try every 10 seconds up to 6 times and log a message between each attempt

```ts
import { auth, poll } from "hexgate";

const credentials = await poll(auth, 10000, 6, () =>
  console.log("Is the LoL client running?")
);
```
