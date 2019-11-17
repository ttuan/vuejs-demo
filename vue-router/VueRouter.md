# Vue Router

+ Add `router-link` - overide click action of browser, not load the page
    but load component :v


+ Add `router-view` to render view component each time link is clicked.
    => SPA will not work without `router-view`


+ Component should be 2 words, to reduce conflict with html element name.
    (`TheNavigation`)

+ Default name of active link class is: `.router-link-exact-active`, you can
    custom this name by option: `linkExactActiveClass`.

```js
const router = new VueRouter({
  linkExactActiveClass: "custom-class-active-link",
  routes
});
```

+ Vue Route will not rerender the same component. for example: If you have
    detail component: `DestinationDetails` and want to pass params from url to
    render destination detail, you have to add `<router-view
    :key="$route.path">`, so that Vue Router should render the page for you.


+ The default mode of vue-router is Hash mode, it uses the url hash to simulate
    the full URL. So that the page won't be reload when url changed. To get rid
    of the hash, we can use history mode, which use history.pushSate API to
    archive URL navigation with page reload.


+ Use `$route` in component create tight coupling with router. => Use prop to
    ignore this.


+ Use named route-link instead of fixed link, so that we can change the url to
    what we want, no need to refactor code.
