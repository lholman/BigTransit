# 4. Use Approved Verbs for PowerShell Commands for consistent naming

Date: 2024-05-08

## Status

Accepted

## Context

Naming things is difficult and can result in a lot of inconsitency. This is particularly important when naming the supporting domain functions and modules of an API implementation. To make the experience of both developing Big Transit and using it as fun, predictable and easy as possible we want some consistent guidelines to the use of verbs when implementing our code.

## Decision

Although we're not developing PowerShell, we will use the [Approved Verbs for PowerShell Commands](https://learn.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7.4) for guiding us on all verb naming for the supporting domain functions and modules of our API implementation so as to provide a consistent approach.  
This Approved Verbs for PowerShell Commands provides some very good recommendations on verb usage along with specific verbs for different lifecycles. It also documents synonyms that should be avoided.

## Consequences

* Improved developer and API consumer experience through the consistent use of verbs within Big Transit for naming the supporting domain functions and modules of our API implementation + other areas as we find them?
* Could result in a perceived unusual use of a verb, however consistency is key here.
