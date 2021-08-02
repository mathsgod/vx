<template>
  <div>
    <!-- BEGIN: Header-->
    <nav
      ref="navbar"
      class="
        header-navbar
        navbar navbar-expand-lg
        align-items-center
        floating-nav
        navbar-light navbar-shadow
      "
      :class="navbarColor"
    >
      <div class="navbar-container d-flex content">
        <div class="bookmark-wrapper d-flex align-items-center">
          <ul class="nav navbar-nav d-xl-none">
            <li class="nav-item">
              <a class="nav-link menu-toggle" href="javascript:void(0);"
                ><vx-icon name="menu"></vx-icon
              ></a>
            </li>
          </ul>
          <ul class="nav navbar-nav bookmark-icons">
            <li class="nav-item d-none d-lg-block">
              <el-tooltip content="My favorite">
                <a class="nav-link" @click.prevent="onFavorite">
                  <vx-icon
                    v-if="isFavorite"
                    name="heart"
                    fill="red"
                    style="color: red !important"
                  ></vx-icon>
                  <vx-icon name="heart" fill="none" v-else></vx-icon>
                </a>
              </el-tooltip>
            </li>
          </ul>
          <!-- ul class="nav navbar-nav bookmark-icons">
            <li class="nav-item d-none d-lg-block">
              <a
                class="nav-link"
                href="app-email.html"
                data-toggle="tooltip"
                data-placement="top"
                title="Email"
                ><i class="ficon" data-feather="mail"></i
              ></a>
            </li>
            <li class="nav-item d-none d-lg-block">
              <a
                class="nav-link"
                href="app-chat.html"
                data-toggle="tooltip"
                data-placement="top"
                title="Chat"
                ><i class="ficon" data-feather="message-square"></i
              ></a>
            </li>
            <li class="nav-item d-none d-lg-block">
              <a
                class="nav-link"
                href="app-calendar.html"
                data-toggle="tooltip"
                data-placement="top"
                title="Calendar"
                ><i class="ficon" data-feather="calendar"></i
              ></a>
            </li>
            <li class="nav-item d-none d-lg-block">
              <a
                class="nav-link"
                href="app-todo.html"
                data-toggle="tooltip"
                data-placement="top"
                title="Todo"
                ><i class="ficon" data-feather="check-square"></i
              ></a>
            </li>
          </ul>
          <ul class="nav navbar-nav">
            <li class="nav-item d-none d-lg-block">
              <a class="nav-link bookmark-star"
                ><i class="ficon text-warning" data-feather="star"></i
              ></a>
              <div class="bookmark-input search-input">
                <div class="bookmark-input-icon">
                  <i data-feather="search"></i>
                </div>
                <input
                  class="form-control input"
                  type="text"
                  placeholder="Bookmark"
                  tabindex="0"
                  data-search="search"
                />
                <ul class="search-list search-list-bookmark"></ul>
              </div>
            </li>
          </ul -->
        </div>
        <ul class="nav navbar-nav align-items-center ml-auto">
          <li class="nav-item dropdown dropdown-language">
            <a
              class="nav-link dropdown-toggle"
              id="dropdown-flag"
              href="javascript:void(0);"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              ><i class="flag-icon flag-icon-us"></i
              ><span class="selected-language">{{ selectedLanguage }}</span></a
            >
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdown-flag"
            >
              <a
                v-for="(l, v) in language"
                :key="v"
                @click="changeLanguage(v)"
                class="dropdown-item"
                href="javascript:void(0);"
                >{{ l }}</a
              >
            </div>
          </li>
          <li class="nav-item d-none d-lg-block">
            <a class="nav-link nav-link-style" @click="toggleDark"
              ><vx-icon
                :name="layoutName == 'dark-layout' ? 'sun' : 'moon'"
              ></vx-icon
            ></a>
          </li>
          <!-- li class="nav-item nav-search">
            <a class="nav-link nav-link-search"
              ><i class="ficon" data-feather="search"></i
            ></a>
            <div class="search-input">
              <div class="search-input-icon"><i data-feather="search"></i></div>
              <input
                class="form-control input"
                type="text"
                placeholder="Explore Vuexy..."
                tabindex="-1"
                data-search="search"
              />
              <div class="search-input-close"><i data-feather="x"></i></div>
              <ul class="search-list search-list-main"></ul>
            </div>
          </li -->

          <li class="nav-item dropdown dropdown-notification mr-25 d-none">
            <a
              class="nav-link"
              href="javascript:void(0);"
              data-toggle="dropdown"
              ><i class="ficon" data-feather="bell"></i
              ><!-- span class="badge badge-pill badge-danger badge-up">5</span --></a
            >
            <!-- ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
              <li class="dropdown-menu-header">
                <div class="dropdown-header d-flex">
                  <h4 class="notification-title mb-0 mr-auto">Notifications</h4>
                  <div class="badge badge-pill badge-light-primary">6 New</div>
                </div>
              </li>
              <li class="scrollable-container media-list">
                <a class="d-flex" href="javascript:void(0)">
                  <div class="media d-flex align-items-start">
                    <div class="media-left">
                      <div class="avatar">
                        <img
                          src="images/portrait/small/avatar-s-15.jpg"
                          alt="avatar"
                          width="32"
                          height="32"
                        />
                      </div>
                    </div>
                    <div class="media-body">
                      <p class="media-heading">
                        <span class="font-weight-bolder"
                          >Congratulation Sam 🎉</span
                        >winner!
                      </p>
                      <small class="notification-text">
                        Won the monthly best seller badge.</small
                      >
                    </div>
                  </div> </a
                ><a class="d-flex" href="javascript:void(0)">
                  <div class="media d-flex align-items-start">
                    <div class="media-left">
                      <div class="avatar">
                        <img
                          src="images/portrait/small/avatar-s-3.jpg"
                          alt="avatar"
                          width="32"
                          height="32"
                        />
                      </div>
                    </div>
                    <div class="media-body">
                      <p class="media-heading">
                        <span class="font-weight-bolder">New message</span
                        >&nbsp;received
                      </p>
                      <small class="notification-text">
                        You have 10 unread messages</small
                      >
                    </div>
                  </div> </a
                ><a class="d-flex" href="javascript:void(0)">
                  <div class="media d-flex align-items-start">
                    <div class="media-left">
                      <div class="avatar bg-light-danger">
                        <div class="avatar-content">MD</div>
                      </div>
                    </div>
                    <div class="media-body">
                      <p class="media-heading">
                        <span class="font-weight-bolder">Revised Order 👋</span
                        >&nbsp;checkout
                      </p>
                      <small class="notification-text">
                        MD Inc. order updated</small
                      >
                    </div>
                  </div>
                </a>
                <div class="media d-flex align-items-center">
                  <h6 class="font-weight-bolder mr-auto mb-0">
                    System Notifications
                  </h6>
                  <div
                    class="custom-control custom-control-primary custom-switch"
                  >
                    <input
                      class="custom-control-input"
                      id="systemNotification"
                      type="checkbox"
                      checked=""
                    />
                    <label
                      class="custom-control-label"
                      for="systemNotification"
                    ></label>
                  </div>
                </div>
                <a class="d-flex" href="javascript:void(0)">
                  <div class="media d-flex align-items-start">
                    <div class="media-left">
                      <div class="avatar bg-light-danger">
                        <div class="avatar-content">
                          <i class="avatar-icon" data-feather="x"></i>
                        </div>
                      </div>
                    </div>
                    <div class="media-body">
                      <p class="media-heading">
                        <span class="font-weight-bolder">Server down</span
                        >&nbsp;registered
                      </p>
                      <small class="notification-text">
                        USA Server is down due to hight CPU usage</small
                      >
                    </div>
                  </div> </a
                ><a class="d-flex" href="javascript:void(0)">
                  <div class="media d-flex align-items-start">
                    <div class="media-left">
                      <div class="avatar bg-light-success">
                        <div class="avatar-content">
                          <i class="avatar-icon" data-feather="check"></i>
                        </div>
                      </div>
                    </div>
                    <div class="media-body">
                      <p class="media-heading">
                        <span class="font-weight-bolder">Sales report</span
                        >&nbsp;generated
                      </p>
                      <small class="notification-text">
                        Last month sales report generated</small
                      >
                    </div>
                  </div> </a
                ><a class="d-flex" href="javascript:void(0)">
                  <div class="media d-flex align-items-start">
                    <div class="media-left">
                      <div class="avatar bg-light-warning">
                        <div class="avatar-content">
                          <i
                            class="avatar-icon"
                            data-feather="alert-triangle"
                          ></i>
                        </div>
                      </div>
                    </div>
                    <div class="media-body">
                      <p class="media-heading">
                        <span class="font-weight-bolder">High memory</span
                        >&nbsp;usage
                      </p>
                      <small class="notification-text">
                        BLR Server using high memory</small
                      >
                    </div>
                  </div>
                </a>
              </li>
              <li class="dropdown-menu-footer">
                <a class="btn btn-primary btn-block" href="javascript:void(0)"
                  >Read all notifications</a
                >
              </li>
            </ul -->
          </li>
          <li class="nav-item dropdown dropdown-user">
            <a
              class="nav-link dropdown-toggle dropdown-user-link"
              id="dropdown-user"
              href="javascript:void(0);"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div class="user-nav d-sm-flex d-none">
                <span class="user-name font-weight-bolder"
                  >{{ me.first_name }} {{ me.last_name }}</span
                ><span class="user-status">{{ me.usergroup }}</span>
              </div>
              <span class="avatar"
                ><img
                  class="round"
                  :src="me.image"
                  alt="avatar"
                  height="40"
                  width="40" /><span class="avatar-status-online"></span
              ></span>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdown-user"
            >
              <router-link class="dropdown-item" to="/User/profile"
                ><i class="mr-50" data-feather="user"></i>
                {{ $t("Profile") }}</router-link
              >
              <div class="dropdown-divider"></div>
              <!-- navbar dropdown -->
              <router-link
                class="dropdown-item"
                v-for="(dd, index) in navbar.dropdown"
                :key="index"
                :to="dd.link"
              >
                <i class="mr-50" :class="dd.icon"></i>
                {{ dd.label }}</router-link
              >
              <router-link class="dropdown-item" to="/User/setting"
                ><vx-icon name="settings" class="mr-50"></vx-icon>
                {{ $t("Settings") }}</router-link
              ><!-- a class="dropdown-item" href="page-pricing.html"
                ><i class="mr-50" data-feather="credit-card"></i> Pricing</a
              ><a class="dropdown-item" href="page-faq.html"
                ><i class="mr-50" data-feather="help-circle"></i> FAQ</a
              -->
              <a class="dropdown-item" href="/logout" @click.prevent="logout"
                ><vx-icon name="power" class="mr-50"></vx-icon
                >{{ $t("Logout") }}</a
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <!-- END: Header-->

    <!-- BEGIN: Main Menu-->
    <div
      class="main-menu menu-fixed menu-light menu-accordion menu-shadow"
      data-scroll-to-active="true"
      ref="mainMenu"
    >
      <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item mr-auto">
            <a
              class="navbar-brand"
              :href="$vx.config['company-url']"
              target="_blank"
            >
              <el-image
                v-if="$vx.config['company-logo']"
                :src="$vx.config['company-logo']"
                style="height: 30px"
                fit="contain"
              ></el-image>
              <h2 class="brand-text" v-else>{{ $vx.config.company }}</h2>
            </a>
          </li>
          <li class="nav-item nav-toggle">
            <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"
              ><i
                class="d-block d-xl-none text-primary toggle-icon font-medium-4"
                data-feather="x"
              ></i
              ><i
                class="
                  d-none d-xl-block
                  collapse-toggle-icon
                  font-medium-4
                  text-primary
                "
                data-feather="disc"
                data-ticon="disc"
              ></i
            ></a>
          </li>
        </ul>
      </div>
      <div class="shadow-bottom"></div>
      <div class="main-menu-content">
        <ul
          class="navigation navigation-main"
          id="main-menu-navigation"
          data-menu="menu-navigation"
        >
          <template v-if="favs.length > 0">
            <li class="navigation-header">
              <span v-t="'My favorite'"></span
              ><i data-feather="more-horizontal"></i>
            </li>

            <nav-item
              class="nav-item"
              v-for="(m, index) in favs"
              :value="m"
              :key="`fav-${index}`"
            ></nav-item>
          </template>

          <li class="navigation-header">
            <span v-t="'Main navigation'"></span
            ><i data-feather="more-horizontal"></i>
          </li>
          <nav-item
            class="nav-item"
            v-for="(m, index) in menus"
            :value="m"
            :key="index"
          ></nav-item>
        </ul>
      </div>
    </div>
    <!-- END: Main Menu-->

    <!-- BEGIN: Content-->
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow" ref="navBarShadow"></div>
      <div class="content-wrapper" :class="contentWrapperClass()">
        <div class="content-header row">
          <div class="content-header-left col-md-9 col-12 mb-2">
            <div class="row breadcrumbs-top">
              <div class="col-12">
                <h2 class="content-header-title float-left mb-0">
                  {{ title }}
                </h2>
                <div class="breadcrumb-wrapper">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <router-link to="/">Home</router-link>
                    </li>

                    <li
                      class="breadcrumb-item"
                      v-for="(b, i) in breadcrumb"
                      :key="i"
                    >
                      <router-link :to="b.to">{{ b.label }}</router-link>
                    </li>

                    <li class="breadcrumb-item active">{{ title }}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!--div
            class="
              content-header-right
              text-md-right
              col-md-3 col-12
              d-md-block d-none
            "
          >
            <div class="form-group breadcrumb-right">
              <div class="dropdown">
                <button
                  class="
                    btn-icon btn btn-primary btn-round btn-sm
                    dropdown-toggle
                  "
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i data-feather="grid"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="app-todo.html"
                    ><i class="mr-1" data-feather="check-square"></i
                    ><span class="align-middle">Todo</span></a
                  ><a class="dropdown-item" href="app-chat.html"
                    ><i class="mr-1" data-feather="message-square"></i
                    ><span class="align-middle">Chat</span></a
                  ><a class="dropdown-item" href="app-email.html"
                    ><i class="mr-1" data-feather="mail"></i
                    ><span class="align-middle">Email</span></a
                  ><a class="dropdown-item" href="app-calendar.html"
                    ><i class="mr-1" data-feather="calendar"></i
                    ><span class="align-middle">Calendar</span></a
                  >
                </div>
              </div>
            </div>
          </div -->
        </div>
        <div class="content-body" ref="content"></div>
      </div>
    </div>
    <!-- END: Content-->

    <vx-customizer></vx-customizer>

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <!-- BEGIN: Footer-->
    <footer class="footer footer-static footer-light" ref="footer">
      <p class="clearfix mb-0">
        <span class="float-md-left d-block d-md-inline-block mt-25"
          >COPYRIGHT &copy; {{ config["copyright-year"]
          }}<a class="ml-25" :href="config['copyright-url']" target="_blank">{{
            config["copyright-name"]
          }}</a
          ><span class="d-none d-sm-inline-block"
            >, All rights Reserved</span
          ></span
        >
      </p>
    </footer>
    <button class="btn btn-primary btn-icon scroll-top" type="button">
      <i data-feather="arrow-up"></i>
    </button>
    <!-- END: Footer-->
  </div>
</template>

<script>
import NavItem from "./nav-item";
import VxCustomizer from "./vx-customizer";
export default {
  name: "VxApp",
  provide() {
    return {
      layout: this,
    };
  },
  data() {
    return {
      menus: [],
      language: [],
      title: "",
      module_name: "",
      breadcrumb: [],
      me: {},
      config: {},
      navbarColor: "",
      width: "full",
      navbarType: "floating",
      footerType: "static",
      layoutName: "light-layout",
      menuCollapsed: false,
      selectedLanguage: null,
      navbar: null,
      favs: [],
    };
  },
  components: {
    NavItem,
    VxCustomizer,
  },
  created() {
    if (!this.$vx.logined) {
      this.$router.push("/");
      return;
    }

    this.favs = this.$vx.favs;
    this.menus = this.$vx.menus;
    this.language = this.$vx.language;
    this.me = this.$vx.me;
    this.config = this.$vx.config;

    if (this.me.style) {
      this.layoutName = this.me.style.layout || "semi-dark-layout";
      this.navbarColor = this.me.style.navbar_color || "";
      this.navbarType = this.me.style.navbar_type || "static";
      this.footerType = this.me.style.footer_type || "static";
      this.menuCollapsed = this.me.style.collapsible || false;
      console.log(this.me);
    }

    if (this.menuCollapsed) {
      document.body.classList.add("menu-collapsed");
    } else {
      document.body.classList.add("menu-expanded");
    }

    this.selectedLanguage = this.$vx.getSelectedLanguage();

    if (this.$route.path == "/" && this.me.default_page) {
      this.$router.push(this.me.default_page);
    }

    this.navbar = this.$vx.navbar ?? {};

    console.log("route path", this.$route.path);
    this.$vx.setRoute(this.$route);
  },
  async mounted() {
    if (window.feather) {
      window.feather.replace({
        width: 14,
        height: 14,
      });
    }

    setTimeout(() => {
      window.dispatchEvent(new Event("load"));
      window.$.app.nav.init();
    });

    this.loadNavbarType();

    await this.renderContent(this.$route.fullPath);
  },
  watch: {
    async $route(to) {
      this.$vx.setRoute(to);
      this.renderContent(to.fullPath);
    },
    navbarColor() {
      this.$vx.setNavbarColor(this.navbarColor);
    },
    menuCollapsed() {
      window.$(".modern-nav-toggle").trigger("click");
      window.$(".main-menu").trigger("mouseleave");

      this.$vx.setCollapsible(this.menuCollapsed);
    },
    layoutName() {
      let mainMenu = window.$(this.$refs.mainMenu);
      let navbar = window.$(this.$refs.navbar);
      let body = window.$(document.body);

      body
        .removeClass("dark-layout bordered-layout semi-dark-layout")
        .addClass(this.layoutName);

      if (this.layoutName == "light-layout") {
        mainMenu.removeClass("menu-dark").addClass("menu-light");
        navbar.removeClass("navbar-dark").addClass("navbar-light");
      }

      if (this.layoutName == "semi-dark-layout") {
        mainMenu.removeClass("menu-light").addClass("menu-dark");
        navbar.removeClass("navbar-dark").addClass("navbar-light");
      }

      if (this.layoutName == "bordered-layout") {
        body.addClass("bordered-layout");
        mainMenu.removeClass("menu-dark").addClass("menu-light");
        navbar.removeClass("navbar-dark").addClass("navbar-light");
      }

      if (this.layoutName == "dark-layout") {
        body.addClass("dark-layout");
        mainMenu.removeClass("menu-dark").addClass("menu-light");
        navbar.removeClass("navbar-dark").addClass("navbar-light");
      }

      this.$vx.setLayout(this.layoutName);
    },
    footerType() {
      let footer = window.$(this.$refs.footer);
      let body = window.$(document.body);

      // Hides footer
      if (this.footerType == "hidden") {
        footer.addClass("d-none");
        body
          .removeClass("footer-static footer-fixed")
          .addClass("footer-hidden");
      }

      // changes to Static footer
      if (this.footerType == "static") {
        body.removeClass("footer-fixed");
        footer.removeClass("d-none").addClass("footer-static");
        body
          .removeClass("footer-hidden footer-fixed")
          .addClass("footer-static");
      }

      // changes to Sticky footer
      if (this.footerType == "sticky") {
        body
          .removeClass("footer-static footer-hidden")
          .addClass("footer-fixed");
        footer.removeClass("d-none footer-static");
      }
    },
  },
  computed: {
    isFavorite() {
      let paths = this.favs.map((fav) => fav.link);
      return paths.indexOf(this.$route.fullPath) >= 0;
    },
  },
  methods: {
    async onFavorite() {
      if (this.isFavorite) {
        await this.$vx.removeMyFavorite(this.$route.fullPath);
      } else {
        try {
          let { value } = await this.$prompt("Please input label");
          await this.$vx.addMyFavorite(value, this.$route.fullPath);
        } catch (e) {}
      }

      //reload manu
      await this.$vx.reload();
      this.favs=this.$vx.favs;
    },
    toggleDark() {
      if (this.layoutName == "dark-layout") {
        this.layoutName = "light-layout";
      } else {
        this.layoutName = "dark-layout";
      }
    },
    async logout() {
      await this.$vx.logout();
      this.$emit("logout");
      this.$router.push("/");
    },
    async renderContent(path) {
      console.log("render content", path);
      this.breadcrumb = [];
      this.title = "";
      let resp;
      try {
        resp = await this.$vx.get(path);
      } catch (e) {
        window.$(this.$refs.content).html(e);
        return;
      }

      let content = "";

      let paths = this.$route.path.split("/");

      this.title = paths[paths.length - 1];
      this.title = this.$i18n.t(this.title);

      if (paths.length > 2) {
        this.breadcrumb.push({
          to: "/" + paths[1],
          label: this.$i18n.t(paths[1]),
        });
      }

      if (resp.headers["content-type"] == "text/html; charset=UTF-8") {
        content = resp.data;
      } else {
        resp = resp.data;

        if (resp.status == 301 || resp.status == 302 || resp.status == 303) {
          //redirect

          this.$router.push(resp.location);
          return;
        }

        for (let action of resp) {
          switch (action.type) {
            case "message":
              this.$message(action.body);
              break;

            case "notify":
              this.$notify(action.body);
              break;

            case "redirect":
              this.$router.push(action.body);
              break;

            case "page":
              console.log(action);
              content += action.body.content;
              if (action.body.header) {
                this.title = this.$i18n.t(action.body.header.title);
              }

              break;
          }
        }
      }

      window.$(this.$refs.content).html(content);
    },
    async changeLanguage(language) {
      await this.$vx.setSelectedLanguage(language);
      this.selectedLanguage = this.$vx.getSelectedLanguage();
      this.$router.go();
    },
    contentWrapperClass() {
      let c = [];
      if (this.width == "boxed") {
        c.push("container");
        c.push("p-0");
      }
      return c;
    },
    async setFooterType(type) {
      this.footerType = type;
      await this.$vx.setFooterType(this.footerType);
    },
    setNavbarType(type) {
      this.$vx.setNavbarType(type);
      this.navbarType = type;
      this.loadNavbarType();
    },
    loadNavbarType() {
      let navBarShadow = window.$(this.$refs.navBarShadow);
      let navbar = window.$(this.$refs.navbar);
      let body = window.$(document.body);
      if (this.navbarType == "floating") {
        navBarShadow.removeClass("d-none");
        navbar
          .removeClass("d-none navbar-static-top fixed-top")
          .addClass("floating-nav");
        body
          .removeClass("navbar-static navbar-hidden navbar-sticky")
          .addClass("navbar-floating");
      }

      if (this.navbarType == "static") {
        navBarShadow.addClass("d-none");
        navbar
          .removeClass("d-none floating-nav fixed-top")
          .addClass("navbar-static-top");
        body
          .removeClass("navbar-hidden navbar-floating navbar-sticky")
          .addClass("navbar-static");
      }

      if (this.navbarType == "sticky") {
        navBarShadow.addClass("d-none");

        navbar
          .removeClass("d-none floating-nav navbar-static-top")
          .addClass("fixed-top");

        body
          .removeClass("navbar-static navbar-floating navbar-hidden")
          .addClass("navbar-sticky");
      }

      if (this.navbarType == "hidden") {
        navbar.addClass("d-none");
        navBarShadow.addClass("d-none");
        body
          .removeClass("navbar-static navbar-floating navbar-sticky")
          .addClass("navbar-hidden");
      }
    },
  },
};
</script>
