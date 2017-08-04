---
title: 'redux-first-router - Just dispatch actions - Interview with James Gillmore'
date: 2017-08-04
headerImage: '/assets/img/XXX.jpg'
keywords: ['interview']
---

![redux-first-router flow chart](https://raw.githubusercontent.com/faceyspacey/redux-first-router/master/docs/redux-first-router-flow-chart.png)

TODO: I'll fill this up and link to your Twitter (@faceyspacey)

## Can you tell a bit about yourself?

<p>
  <span class="author">
    <img src="https://avatars2.githubusercontent.com/u/154732?v=4&s=460" alt="James Gillmore" class="author" width="100" height="100" />
  </span>

  <span class="author">
    <img src="https://twitter.com/faceyspacey/profile_image?size=original" alt="James Gillmore" class="author" width="100" height="100" />
  </span>
</p>

I've tried to stay quiet and keep it about the code rather than myself. But perhaps now is a good time to say a few words about my story.

Basically I started 12 years ago (2005) by hiring other developers to build things. I worked at a music studio in Times Square, NYC and hired developers to build websites for our clients. Eventually I even got into the MySpace spamming thing. I had been doing a lot of audio engineering, but soon realized that my talents were best more directly applied to technology. My dreams of becoming a famous beat-maker never came true.

So I jumped ship, started my boutique web development agency, [FaceySpacey Technologies](http://www.faceyspacey.com) (2007), got myself into trouble completing products on time for clients, and became a coder as a matter of necessity (2010). The rest is history - a very long history of self-mastery (both in programming and the real world).

## How would you describe *redux-first-router* to someone who has never heard of it?

Redux-First Router is something that should have existed long ago, but because the React community at the time was caught up in throwing out so much ancient wisdom, it was skipped over. Redux-First Router completes the triumvirate of the MVC (Model-View-Controller), adding the C to the equation (where Redux is the M and React the V). Basically, it was as if nobody wanted to hear the letters MVC again. It's anathema to me too, but it is what it is.

It also kills the "everything is a component" concept when it comes to routes. Redux-First Router follows the philosophy that "everything is state" and routes are 100% in sync with actions to trigger that state. The components that make up your view layer just render from state as they should.

## How does *redux-first-router* work?

With Redux-First Router, actions are dispatched as a result of visiting URLs and conversely, the address bar is updated in response to matching actions.

What's significant and special about it is something that was never done before: the actions dispatched have unique `type`s that only the given kind of URL have. This is unique because previous attempts at Redux routing (such as *redux-little-router*) dispatch actions that all have the same type: the equivalent of `LOCATION_CHANGED`. Then you have to dig through lots of information nested in that action to figure out what really happened. It wasn't conducive to switching over types as is idiomatic in reducers.

As obvious as it sounds, having a `type` that is as informative as actions you manually dispatch is the key ingredient that finally makes routing seamless for Redux apps.

## How does *redux-first-router* differ from the other solutions?

### No `<Route />` components

Initial attempts at Redux routing followed the React Router approach that *"everything is a component".* As [one of our initial users](https://github.com/kmcclosk) put it, *"cargo culting the same React Router stuff as everyone else just didn't feel right, felt leaky, felt hacky".*

The fact of the matter is that keeping any state (especially URL state) in the view layer has been an anti-pattern for a long time now, yet somehow React convinced us that it was the exception. It makes sense when you *don't* have Redux (or another data store). But when you do, a lot more powerful opportunities unveil themselves to you.

Redux-First Router avoids using the same misplaced `<Route />` components from React Router and similar packages. These packages promoted their own version of `<Route />`, rather than take advantage of how Redux removes state from the view layer.

`<Route />` is for developers for whom Redux is still out of reach. Contrary to how easy seasoned developers may feel Redux is, it's definitely difficult for novice and even intermediate developers. So I think `<Route />` still makes sense for a large category of users, but for power users Redux-First Router kills the `<Route />` component as well as the "state-within-the-view-layer" anti-pattern.

### The Redux philosophy

Everything you do with Redux-First Router mirrors the terminology and thinking of Redux itself. The primary example is the `thunk` option attached to routes - it has the same api as used with `redux-thunk`, i.e. the `dispatch` and `getState` arguments.

In addition, it's about what Redux-First Router stands for (its *philosophy*). The fact that from the start you are encouraged to get the most out of Redux is a meaningful thing. Philosophy is meaningful. The same way all the contracts Dan Abramov enforced on us have made our lives easier.

### Further unique features

Here's a quick list of more of the unique and powerful things you can do with Redux-First Router:

- route-triggered data-fetching
- prefetching of (both chunks + data!)
- React Native support (Android BackHandler, Deep Linking, Push Notifications)
- sick stuff to make React Navigation *actually* work with Redux (this is really our best stuff which you'll be hearing about soon)
- top notch server-side rendering idioms
- absolutely everything you'd expect (redirects, 404s, scroll restoration, <Link /> components, automatic document.title management, page-leave confirmations, dynamic route adding for code-splitting, history entries state, the list goes on...)

Most attempts at redux-specific routing have been pretty bare bones and never got around to polishing enough to make them a full-featured solution. While there's always some feature that will need to be added, Redux-First Router is something I've committed to for the community. So no expense has been spared!

## Why did you develop *redux-first-router*?

Here's what I haven't told anyone and SurviveJS is the first to hear it: I am actually a relative newcomer to React (December 2015). I decided to skip straight to React Native (so I could skip mastering webpack and all the related choices). I had a client project I had to build with a deadline. I jumped right in and built it using Redux. Near the end of the app I had to add deep linking and push notifications. So I wanted to find a way to make the app URL-driven without changing much code. I began looking into other redux routing solutions for RN, and since those weren't doing the trick, I decided to check out what they were doing on plain web.

I then realized there wasn't anything anywhere that allowed you to build your Redux app in a *URL-independent way*, yet while still having support for URLs. At that point it occurred to me that the obvious solution was to make your regular flux standard actions somehow be representative  of URLs.

That's where the whole "action types as paths" concept was born. I built the router and had to change almost no code. Since all my actions were Flux Standard Actions with payload objects, it was only a matter of setting up the routing config, and then doing a few changes in reducers.

It was really not all that complicated to do, so I was surprised that nobody had taken that route yet.

## Tell us more about not having to change your code

Well, the concept is essentially that you have fewer actions when using *Redux-First Router* (which is very good thing by the way, given how the number of actions can get out of control). Instead of having one action to show a drawer, and another action to close it (e.g. `'OPEN_DRAWER'` and `'CLOSE_DRAWER'`), you simply have `'FEED'` and `'NOTIFICATIONS'` which you'll need anyway. Then in the reducers, you must add some "tear down" code to open and close the drawer when you visit these routes. For instance, when you visit `'NOTIFICATIONS'` the `drawerOpen` state is `true` and when you visit `'FEED'`, `drawerOpen` is `false`.

Here's an example taken from the [Redux-First Router solving the 80% use-case for Middleware article](https://medium.com/faceyspacey/redux-first-router-data-fetching-solving-the-80-use-case-for-async-middleware-14529606c262):

**Old approach with many actions**
![old reducer](https://user-images.githubusercontent.com/154732/28441757-4145b8fe-6d61-11e7-8666-61c5843463ba.png)

**New approach with fewer actions and smarter / fatter reducers:**
![new reducer](https://user-images.githubusercontent.com/154732/28441758-42bb28f4-6d61-11e7-9e29-563f96270ac3.png)

So that's basically all I had to do - change my reducers, remove unnecessary actions being dispatched, make my reducers respond intelligently to a wider variety of actions, and voila! In record time I now had URLs and could deep link into my app.

## What next?

I've been working on completing my *Universal* product line. That will have some exciting connections to Redux-First Router. The hint is the word "prefetching". My overall main priority has been building "Next.js for the rest of us". Put another way, the frameworkless approach to the best features from Next.js.

Next.js is great, but very few power users want to get locked in their walled garden. So by the time I'm done with my initial vision, the only reasons to use Next.js will be that webpack configuration is either too much for you or just something you would rather not deal with. For truly professional apps, I can't see how seasoned developers would want it any other way. If you're aiming for the top spot in your given market, you want complete customization available to you.

## What does the future look like for *redux-first-router* and web development in general? Can you see any particular trends?

Simultaneous server-side rendering (SSR) and code splitting will become big. It's been a gritty, time-consuming problem and nobody has wanted to solve it generally. My view is that the single page application is dead, and if you're not simultaneously SSRing and splitting you're doing it wrong. Traffic from Google is the biggest driver for so many businesses, and a key component of basically all online / digital businesses. To go without SSR is a mistake. And since the tools we are using these days are so heavy in terms of bytes, not splitting your code is perhaps an even bigger mistake. Both need to be done together.

By the way, not splitting doesn't just increase bounce rates, it also compounds the *Google problem*, since Google likes fast sites.

Until [now](https://medium.com/@faceyspacey/code-cracked-for-code-splitting-ssr-in-reactlandia-react-loadable-webpack-flush-chunks-and-1a6b0112a8b8), doing both SSR and code splitting has been a hair-pulling experience. Most people just gave up. I won't get into the nitty gritty of what the challenge is today. But you can read my [code cracked for SSR + Splitting article](https://medium.com/@faceyspacey/code-cracked-for-code-splitting-ssr-in-reactlandia-react-loadable-webpack-flush-chunks-and-1a6b0112a8b8) to learn why.

Oh and by the way, SSR with Redux-First Router is basically the most idiomatic Redux has ever been on the server. And due to the way my ***Universal*** product line works regardless of which router you use, simultaneous SSR and code splitting is a dream with Redux-First Router. There is still some stuff left to do, and if you've heard that splitting isn't related to routing, you've been misled. To do it at the highest level, you need to do prefetching.

So the connection between the router and splitting is a simple interface to specify which route to prefetch. That's all. Redux-First Router is the first solution that really does this. Next.js has `<Link prefetch />` but Redux-First Router has something far more powerful: automatic pre-fetching based on your current state, such as the current page a user is on, as recorded in Redux state. There's a one-time setup, but once it's working, potential next routes will be pre-fetched.

There's one final thing to know about how Redux-First Router prefetching works: not just the "chunk" is prefetched, but the data from your route thunks as well!

## What advice would you give to programmers getting into web development?

Question your intentions before you do anything. You'll waste your time doing the wrong thing with intentions that are likely to shift and evolve.

The paradox is that it takes a long time to reach the sort of maturity where your intentions become "better". I started out in the game, not as a developer, but an entrepreneur wanting to build an empire. Reality has long since kicked my ass as I forced myself to become a coder to dig myself out of a hole. That is to say, *a long, VERY LONG, history*. Mastering this craft is time-consuming. And it's not about passion. I like to think of myself as a straight-shooter cowboy type with clarity of vision. Sure I have passion for software, but it's more about the natural enthusiasm for creation and conception in general. Actually, the truth is I enjoy other things outside of staring at a screen far more. For me it's about being a craftsman as a matter of maturity and integrity. To pay the bills, create value, and make real the stuff that only exists in my mind as I'm innately compelled to do.

I've built open source projects primarily because I refused to start another project without these boxes checked.

Also, don't focus on open source. If you do, make sure that your intentions are truly pure and that it makes sense for the juncture you're currently at. For me, I have things I plan to create, and for the time being I have the luxury to go the long first-principled route, which happens to align with open source contribution. After all, getting your creations in front of the most people is what it's all about.

So my advice to new programmers is: skip college, get yourself into a jam (or 2 or 3 or more) where you have to complete a product, and force yourself to become a better a programmer as the only option you have. Then after you know a thing or two with conviction, build something only you have the unique insights to build.

## Who should I interview next?

Interview someone who's leading the serverless charge when it comes to React. That's another trend that will explode soon as a few more puzzle pieces come together. Perhaps the [Dawson](https://github.com/dawson-org/dawson-cli) guys. I haven't tried it yet, but I'd love to see serverless made stupid simple for the React crowd and they seem to be on that path.

Here's someone else who you should interview:

[@nchanged](https://github.com/nchanged) from [FuseBox](https://github.com/fuse-box/fuse-box)

Perhaps I have an addiction to debunking stale solutions. Even though I get a tremendous amount of value from webpack, I'd love to see it built from the ground up, and everything made a lot simpler while still being flexible. I know I'm not alone in that feeling. FuseBox seems to show promise of being able to do that, but perhaps it's easier said than done.

## Any last remarks?

If you've ever felt Redux deserved a routing solution native to its workflow, give Redux-First Router a try :)

## Conclusion

TODO: I'll fill this up, thank, and link. Feel free to add resources here.


Here's the chronological history of how my 2 product lines have been progressing thus far:

**Redux-First Router:**
- [release article](https://medium.com/@faceyspacey/pre-release-redux-first-router-a-step-beyond-redux-little-router-cd2716576aea)
- [the "sexy" on CodeSandBox article](https://medium.com/faceyspacey/redux-first-router-lookin-sexy-on-code-sandbox-d9d9bea15053)
- [data-fetching + Middleware debunking article](https://medium.com/faceyspacey/redux-first-router-data-fetching-solving-the-80-use-case-for-async-middleware-14529606c262)

**Universal:**
- ["Code Cracked"--the article that started it all](https://medium.com/@faceyspacey/code-cracked-for-code-splitting-ssr-in-reactlandia-react-loadable-webpack-flush-chunks-and-1a6b0112a8b8)
- [the "Magic Comments" article](https://medium.com/@faceyspacey/how-to-use-webpacks-new-magic-comment-feature-with-react-universal-component-ssr-a38fd3e296a)
- [an accidentally popular article on importing both JS + CSS](https://medium.com/faceyspacey/webpacks-import-will-soon-fetch-js-css-here-s-how-you-do-it-today-4eb5b4929852)

**Repos:**
- [redux-first-router](https://github.com/faceyspacey/redux-first-router)
- [universal](https://github.com/faceyspacey/universal-render)

Thanks for the interview James!
