# Learn to create a simple PWA React-Redux App

## App Shell - Static Files
* We will cache them at the time of installing the service worker
* **Cache First, if not found, get the files from Network**

<!-- ## API calls - Read from Server - Dynamic Outputs
* **Network First, if not found, fetch from the cache** -->

## Redux

This needs to be divided into 2 parts:

### Persist the store
This is required so that if something goes wrong and we loose the store due to bad connectivity, we have a place to start back.
> Similar to commit in Database.

We will do this periodically, to persist the store.

### Store actions which you think can break your app

## Read from the server.
* Initial Load, ?
* When offline, ??
* When back online, ???
* When online, fetch the data, ????

## Write to the server
* When offline, stack up all the `writes` related action and show a notification that on how many items are pending to be synced with the server.
* Once back online, 
    * sync all the queued up actions with server and display notification `Back Online, Updating your TODOs`.
    * After each write persist the store?
* When online, normal workflow

**To be covered maybe in a future session?**

# Server
Basic REST API Server using Node-Express & Mongo DB database.


## Some important libraries required
1. Local Forage added



1. Local Forage added
2. Making `myServiceWorker.js` ES6? 

Navigator online and offline events.
