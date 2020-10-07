import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";

/**********
 * Themes styles
 ***********/
import "take-home-assignment-design-system/dist/themes/dark/theme.css";
import "take-home-assignment-design-system/dist/themes/light/theme.css";

/**********
 * Design system styles
 ***********/
import "take-home-assignment-design-system/dist/design-system/design-system.css";

/**********
 * General styles
 ***********/

import "./app.scss";

createApp(App)
  .use(router)
  .mount("#tk-root");
