# Something learned from projects

Some HTML elements, for example <table> , have restrictions on
what elements can appear inside them. Custom elements that are not
in the whitelist will be hoisted out and thus not render properly. In
such cases you should use the is special attribute to indicate a
custom element.

`<tr v-for="story in stories" is="story" :story="story"></tr>`
