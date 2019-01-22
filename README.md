# Running

`yarn && yarn serve`

then open in your browser `http://localhost:8081/`

# Testing

e2e: `yarn test:e2e` (then click in 'Run all specs')
unit: `yarn test:unit`

# MY NOTES

## Questions
### Approach

I've tried to create what I see as a standard Vue + Vuex app.

The main idea for solving the challenge was to feed a scroll
component with data in 'pages', so that last page viewed, and element,
would be always saved in browser, and could be easily loaded and fetched
again if the page was re-opened.

- Store

Standard store pattern, fetching data with Actions, storing on the State
and getting transformed through Getters.

Note1: I've created `state.infiniteScrollData` to hold the infinite
scroll data but later on I realised that would be better - more organized -
to have a getters for each resource like I describe on `store.js` line 125.

Going beyond organization, I think the less duplicated the data is,
the easier is to manage updates of the same resource (user, phost, photo)
across the application.

Note2: I would also split the store into multiple modules, like 'posts', with
post related resources like 'comments' and also one for 'albums' (which was not implemented)
with 'pictures', for example.

Note3: Usually I would create different fetch methods for different resources
as well, as they might mutate different 'state' in different ways.

- InfiniteScroll.vue

I think this component could encapsulate more behavior, like saving last viewed
page and item and also fetch the data, through a function passed as parameter.

It would be way more easy to reuse it.

I would also have only one dataList, like describe in the line 56.

### How would you unit test this?

Here I thought I could test pretty much everything, the basic
rendering, that I could do, and its basic behavior, but had problems with the scrolling.

If is not possible to test it without launching a browser, I would should a page
in the application, where I could throuly test it, but mocking the api calls -
as it is very easy in cypress.

- Store

I would also test each getter and actions as they become more complex and used
throughout the application.

### How would you e2e test this?

The approach here would be to test it integrated with other components, simulating
the critical application use cases.

As I couldn't make the scroll behavior work in the unit test I tested the component here.
I would also here, as mentioned before, mock the api requets, to avoid the hassle of spinning
up a server.

## Conclusion

Probably it could've be done better, speacially regarding css. I've put a few
arbitrary values in paddings, margins and widths, what I don't like. But it was
only to make have a acceptable look and feel. Right now, I would need more time
and thinking to make it more robust.

In general, I am satisfied with the result.

## TODO:

- load items on scrolling up
- create policy to invalidate scrolling back to last viewed item?
