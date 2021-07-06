<template>
  <!-- BEGIN: Customizer-->
  <div
    class="customizer d-none d-md-block"
    :class="{ open: isOpen }"
    @click="isOpen = !isOpen"
  >
    <a
      class="customizer-toggle d-flex align-items-center justify-content-center"
      href="javascript:void(0);"
      ><i class="spinner" data-feather="settings"></i
    ></a>
    <div class="customizer-content">
      <!-- Customizer header -->
      <div class="customizer-header px-2 pt-1 pb-0 position-relative">
        <h4 class="mb-0">Theme Customizer</h4>
        <p class="m-0">Customize & Preview in Real Time</p>

        <a class="customizer-close" href="javascript:void(0);"
          ><i data-feather="x"></i
        ></a>
      </div>

      <hr />

      <!-- Styling & Text Direction -->
      <div class="customizer-styling-direction px-2">
        <p class="font-weight-bold">Skin</p>
        <div class="d-flex">
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="skinlight"
              name="skinradio"
              class="custom-control-input layout-name"
              data-layout=""
              :checked="layout.layoutName == 'light-layout'"
              @input="layout.layoutName = 'light-layout'"
            />
            <label class="custom-control-label" for="skinlight">Light</label>
          </div>
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="skinbordered"
              name="skinradio"
              class="custom-control-input layout-name"
              data-layout="bordered-layout"
              :checked="layout.layoutName == 'bordered-layout'"
              @input="layout.layoutName = 'bordered-layout'"
            />
            <label class="custom-control-label" for="skinbordered"
              >Bordered</label
            >
          </div>
          <div class="custom-control custom-radio">
            <input
              type="radio"
              id="skindark"
              name="skinradio"
              class="custom-control-input layout-name"
              data-layout="dark-layout"
              :checked="layout.layoutName == 'dark-layout'"
              @input="layout.layoutName = 'dark-layout'"
            />
            <label class="custom-control-label" for="skindark">Dark</label>
          </div>
        </div>
      </div>

      <hr />

      <!-- Menu -->
      <div class="customizer-menu px-2">
        <div id="customizer-menu-collapsible" class="d-flex">
          <p class="font-weight-bold mr-auto m-0">Collapsible</p>
          <div class="custom-control custom-control-primary custom-switch">
            <input
              type="checkbox"
              class="custom-control-input"
              id="collapse-sidebar-switch"
              :checked="layout.menuCollapsed"
              @input="layout.menuCollapsed = !layout.menuCollapsed"
            />
            <label
              class="custom-control-label"
              for="collapse-sidebar-switch"
            ></label>
          </div>
        </div>
      </div>
      <hr />

      <!-- Layout Width -->
      <div class="customizer-footer px-2">
        <p class="font-weight-bold">Layout Width</p>
        <div class="d-flex">
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="layout-width-full"
              name="layoutWidth"
              class="custom-control-input"
              :checked="layout.width == 'full'"
              @input="layout.width = 'full'"
            />
            <label class="custom-control-label" for="layout-width-full"
              >Full Width</label
            >
          </div>
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="layout-width-boxed"
              name="layoutWidth"
              class="custom-control-input"
              :checked="layout.width == 'boxed'"
              @input="layout.width = 'boxed'"
            />
            <label class="custom-control-label" for="layout-width-boxed"
              >Boxed</label
            >
          </div>
        </div>
      </div>
      <hr />

      <!-- Navbar -->
      <div class="customizer-navbar px-2">
        <div id="customizer-navbar-colors">
          <p class="font-weight-bold">Navbar Color</p>
          <ul class="list-inline unstyled-list">
            <li
              class="color-box bg-white border"
              :class="{ selected: layout.navbarColor == '' }"
              data-navbar-default=""
            ></li>
            <li
              v-for="c in COLORS"
              :key="c"
              class="color-box"
              :class="[c, layout.navbarColor == c ? 'selected' : '']"
              @click.prevent="layout.navbarColor = c"
            ></li>
          </ul>
        </div>

        <p class="navbar-type-text font-weight-bold">Navbar Type</p>
        <div class="d-flex">
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="nav-type-floating"
              name="navType"
              class="custom-control-input"
              :checked="layout.navbarType == 'floating'"
              @input="layout.setNavbarType('floating')"
            />
            <label class="custom-control-label" for="nav-type-floating"
              >Floating</label
            >
          </div>
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="nav-type-sticky"
              name="navType"
              class="custom-control-input"
              :checked="layout.navbarType == 'sticky'"
              @input="layout.setNavbarType('sticky')"
            />
            <label class="custom-control-label" for="nav-type-sticky"
              >Sticky</label
            >
          </div>
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="nav-type-static"
              name="navType"
              class="custom-control-input"
              :checked="layout.navbarType == 'static'"
              @input="layout.setNavbarType('static')"
            />
            <label class="custom-control-label" for="nav-type-static"
              >Static</label
            >
          </div>
          <div class="custom-control custom-radio">
            <input
              type="radio"
              id="nav-type-hidden"
              name="navType"
              class="custom-control-input"
              :checked="layout.navbarType == 'hidden'"
              @input="layout.setNavbarType('hidden')"
            />
            <label class="custom-control-label" for="nav-type-hidden"
              >Hidden</label
            >
          </div>
        </div>
      </div>
      <hr />

      <!-- Footer -->
      <div class="customizer-footer px-2">
        <p class="font-weight-bold">Footer Type</p>
        <div class="d-flex">
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="footer-type-sticky"
              name="footerType"
              class="custom-control-input"
              :checked="layout.footerType == 'sticky'"
              @input="layout.setFooterType('sticky')"
            />
            <label class="custom-control-label" for="footer-type-sticky"
              >Sticky</label
            >
          </div>
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="footer-type-static"
              name="footerType"
              class="custom-control-input"
              :checked="layout.footerType == 'static'"
              @input="layout.setFooterType('static')"
            />
            <label class="custom-control-label" for="footer-type-static"
              >Static</label
            >
          </div>
          <div class="custom-control custom-radio mr-1">
            <input
              type="radio"
              id="footer-type-hidden"
              name="footerType"
              class="custom-control-input"
              :checked="layout.footerType == 'hidden'"
              @input="layout.setFooterType('hidden')"
            />
            <label class="custom-control-label" for="footer-type-hidden"
              >Hidden</label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End: Customizer-->
</template>

<script>
export default {
  inject: ["layout"],
  data() {
    return {
      isOpen: false,
      COLORS: [
        "bg-primary",
        "bg-secondary",
        "bg-success",
        "bg-danger",
        "bg-info",
        "bg-warning",
        "bg-dark",
      ],
    };
  },
};
</script>