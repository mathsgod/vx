<template>
  <div>
    <!-- BEGIN: Header-->
    <nav
      class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow"
    >
      <div class="navbar-container d-flex content">
        <div class="bookmark-wrapper d-flex align-items-center">
          <ul class="nav navbar-nav d-xl-none">
            <li class="nav-item">
              <a class="nav-link menu-toggle" href="javascript:void(0);"
                ><i class="ficon" data-feather="menu"></i
              ></a>
            </li>
          </ul>
          <ul class="nav navbar-nav bookmark-icons">
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
          </ul>
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
              ><span class="selected-language">English</span></a
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
            <a class="nav-link nav-link-style"
              ><i class="ficon" data-feather="moon"></i
            ></a>
          </li>
          <li class="nav-item nav-search">
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
          </li>
          <li class="nav-item dropdown dropdown-cart mr-25">
            <a
              class="nav-link"
              href="javascript:void(0);"
              data-toggle="dropdown"
              ><i class="ficon" data-feather="shopping-cart"></i
              ><span
                class="badge badge-pill badge-primary badge-up cart-item-count"
                >6</span
              ></a
            >
            <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
              <li class="dropdown-menu-header">
                <div class="dropdown-header d-flex">
                  <h4 class="notification-title mb-0 mr-auto">My Cart</h4>
                  <div class="badge badge-pill badge-light-primary">
                    4 Items
                  </div>
                </div>
              </li>
              <li class="scrollable-container media-list">
                <div class="media align-items-center">
                  <img
                    class="d-block rounded mr-1"
                    src="images/pages/eCommerce/1.png"
                    alt="donuts"
                    width="62"
                  />
                  <div class="media-body">
                    <i class="ficon cart-item-remove" data-feather="x"></i>
                    <div class="media-heading">
                      <h6 class="cart-item-title">
                        <a class="text-body" href="app-ecommerce-details.html">
                          Apple watch 5</a
                        >
                      </h6>
                      <small class="cart-item-by">By Apple</small>
                    </div>
                    <div class="cart-item-qty">
                      <div class="input-group">
                        <input class="touchspin-cart" type="number" value="1" />
                      </div>
                    </div>
                    <h5 class="cart-item-price">$374.90</h5>
                  </div>
                </div>
                <div class="media align-items-center">
                  <img
                    class="d-block rounded mr-1"
                    src="images/pages/eCommerce/7.png"
                    alt="donuts"
                    width="62"
                  />
                  <div class="media-body">
                    <i class="ficon cart-item-remove" data-feather="x"></i>
                    <div class="media-heading">
                      <h6 class="cart-item-title">
                        <a class="text-body" href="app-ecommerce-details.html">
                          Google Home Mini</a
                        >
                      </h6>
                      <small class="cart-item-by">By Google</small>
                    </div>
                    <div class="cart-item-qty">
                      <div class="input-group">
                        <input class="touchspin-cart" type="number" value="3" />
                      </div>
                    </div>
                    <h5 class="cart-item-price">$129.40</h5>
                  </div>
                </div>
                <div class="media align-items-center">
                  <img
                    class="d-block rounded mr-1"
                    src="images/pages/eCommerce/2.png"
                    alt="donuts"
                    width="62"
                  />
                  <div class="media-body">
                    <i class="ficon cart-item-remove" data-feather="x"></i>
                    <div class="media-heading">
                      <h6 class="cart-item-title">
                        <a class="text-body" href="app-ecommerce-details.html">
                          iPhone 11 Pro</a
                        >
                      </h6>
                      <small class="cart-item-by">By Apple</small>
                    </div>
                    <div class="cart-item-qty">
                      <div class="input-group">
                        <input class="touchspin-cart" type="number" value="2" />
                      </div>
                    </div>
                    <h5 class="cart-item-price">$699.00</h5>
                  </div>
                </div>
                <div class="media align-items-center">
                  <img
                    class="d-block rounded mr-1"
                    src="images/pages/eCommerce/3.png"
                    alt="donuts"
                    width="62"
                  />
                  <div class="media-body">
                    <i class="ficon cart-item-remove" data-feather="x"></i>
                    <div class="media-heading">
                      <h6 class="cart-item-title">
                        <a class="text-body" href="app-ecommerce-details.html">
                          iMac Pro</a
                        >
                      </h6>
                      <small class="cart-item-by">By Apple</small>
                    </div>
                    <div class="cart-item-qty">
                      <div class="input-group">
                        <input class="touchspin-cart" type="number" value="1" />
                      </div>
                    </div>
                    <h5 class="cart-item-price">$4,999.00</h5>
                  </div>
                </div>
                <div class="media align-items-center">
                  <img
                    class="d-block rounded mr-1"
                    src="images/pages/eCommerce/5.png"
                    alt="donuts"
                    width="62"
                  />
                  <div class="media-body">
                    <i class="ficon cart-item-remove" data-feather="x"></i>
                    <div class="media-heading">
                      <h6 class="cart-item-title">
                        <a class="text-body" href="app-ecommerce-details.html">
                          MacBook Pro</a
                        >
                      </h6>
                      <small class="cart-item-by">By Apple</small>
                    </div>
                    <div class="cart-item-qty">
                      <div class="input-group">
                        <input class="touchspin-cart" type="number" value="1" />
                      </div>
                    </div>
                    <h5 class="cart-item-price">$2,999.00</h5>
                  </div>
                </div>
              </li>
              <li class="dropdown-menu-footer">
                <div class="d-flex justify-content-between mb-1">
                  <h6 class="font-weight-bolder mb-0">Total:</h6>
                  <h6 class="text-primary font-weight-bolder mb-0">
                    $10,999.00
                  </h6>
                </div>
                <a
                  class="btn btn-primary btn-block"
                  href="app-ecommerce-checkout.html"
                  >Checkout</a
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown dropdown-notification mr-25">
            <a
              class="nav-link"
              href="javascript:void(0);"
              data-toggle="dropdown"
              ><i class="ficon" data-feather="bell"></i
              ><span class="badge badge-pill badge-danger badge-up">5</span></a
            >
            <ul class="dropdown-menu dropdown-menu-media dropdown-menu-right">
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
            </ul>
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
                <span class="user-name font-weight-bolder">John Doe</span
                ><span class="user-status">Admin</span>
              </div>
              <span class="avatar"
                ><img
                  class="round"
                  src="images/portrait/small/avatar-s-11.jpg"
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
                ><i class="mr-50" data-feather="user"></i> Profile</router-link
              ><a class="dropdown-item" href="app-email.html"
                ><i class="mr-50" data-feather="mail"></i> Inbox</a
              ><a class="dropdown-item" href="app-todo.html"
                ><i class="mr-50" data-feather="check-square"></i> Task</a
              ><a class="dropdown-item" href="app-chat.html"
                ><i class="mr-50" data-feather="message-square"></i> Chats</a
              >
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="page-account-settings.html"
                ><i class="mr-50" data-feather="settings"></i> Settings</a
              ><a class="dropdown-item" href="page-pricing.html"
                ><i class="mr-50" data-feather="credit-card"></i> Pricing</a
              ><a class="dropdown-item" href="page-faq.html"
                ><i class="mr-50" data-feather="help-circle"></i> FAQ</a
              ><router-link class="dropdown-item" to="/logout"
                ><i class="mr-50" data-feather="power"></i> Logout</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <ul class="main-search-list-defaultlist d-none">
      <li class="d-flex align-items-center">
        <a href="javascript:void(0);">
          <h6 class="section-label mt-75 mb-0">Files</h6>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between w-100"
          href="app-file-manager.html"
        >
          <div class="d-flex">
            <div class="mr-75">
              <img src="images/icons/xls.png" alt="png" height="32" />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">Two new item submitted</p>
              <small class="text-muted">Marketing Manager</small>
            </div>
          </div>
          <small class="search-data-size mr-50 text-muted">&apos;17kb</small>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between w-100"
          href="app-file-manager.html"
        >
          <div class="d-flex">
            <div class="mr-75">
              <img src="images/icons/jpg.png" alt="png" height="32" />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">52 JPG file Generated</p>
              <small class="text-muted">FontEnd Developer</small>
            </div>
          </div>
          <small class="search-data-size mr-50 text-muted">&apos;11kb</small>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between w-100"
          href="app-file-manager.html"
        >
          <div class="d-flex">
            <div class="mr-75">
              <img src="images/icons/pdf.png" alt="png" height="32" />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">25 PDF File Uploaded</p>
              <small class="text-muted">Digital Marketing Manager</small>
            </div>
          </div>
          <small class="search-data-size mr-50 text-muted">&apos;150kb</small>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between w-100"
          href="app-file-manager.html"
        >
          <div class="d-flex">
            <div class="mr-75">
              <img src="images/icons/doc.png" alt="png" height="32" />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">Anna_Strong.doc</p>
              <small class="text-muted">Web Designer</small>
            </div>
          </div>
          <small class="search-data-size mr-50 text-muted">&apos;256kb</small>
        </a>
      </li>
      <li class="d-flex align-items-center">
        <a href="javascript:void(0);">
          <h6 class="section-label mt-75 mb-0">Members</h6>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between py-50 w-100"
          href="app-user-view.html"
        >
          <div class="d-flex align-items-center">
            <div class="avatar mr-75">
              <img
                src="images/portrait/small/avatar-s-8.jpg"
                alt="png"
                height="32"
              />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">John Doe</p>
              <small class="text-muted">UI designer</small>
            </div>
          </div>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between py-50 w-100"
          href="app-user-view.html"
        >
          <div class="d-flex align-items-center">
            <div class="avatar mr-75">
              <img
                src="images/portrait/small/avatar-s-1.jpg"
                alt="png"
                height="32"
              />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">Michal Clark</p>
              <small class="text-muted">FontEnd Developer</small>
            </div>
          </div>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between py-50 w-100"
          href="app-user-view.html"
        >
          <div class="d-flex align-items-center">
            <div class="avatar mr-75">
              <img
                src="images/portrait/small/avatar-s-14.jpg"
                alt="png"
                height="32"
              />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">Milena Gibson</p>
              <small class="text-muted">Digital Marketing Manager</small>
            </div>
          </div>
        </a>
      </li>
      <li class="auto-suggestion">
        <a
          class="d-flex align-items-center justify-content-between py-50 w-100"
          href="app-user-view.html"
        >
          <div class="d-flex align-items-center">
            <div class="avatar mr-75">
              <img
                src="images/portrait/small/avatar-s-6.jpg"
                alt="png"
                height="32"
              />
            </div>
            <div class="search-data">
              <p class="search-data-title mb-0">Anna Strong</p>
              <small class="text-muted">Web Designer</small>
            </div>
          </div>
        </a>
      </li>
    </ul>
    <ul class="main-search-list-defaultlist-other-list d-none">
      <li class="auto-suggestion justify-content-between">
        <a
          class="d-flex align-items-center justify-content-between w-100 py-50"
        >
          <div class="d-flex justify-content-start">
            <span class="mr-75" data-feather="alert-circle"></span
            ><span>No results found.</span>
          </div>
        </a>
      </li>
    </ul>
    <!-- END: Header-->

    <!-- BEGIN: Main Menu-->
    <div
      class="main-menu menu-fixed menu-light menu-accordion menu-shadow"
      data-scroll-to-active="true"
    >
      <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item mr-auto">
            <a
              class="navbar-brand"
              href="../../../html/ltr/vertical-menu-template/index.html"
            >
              <h2 class="brand-text">Vuexy</h2>
            </a>
          </li>
          <li class="nav-item nav-toggle">
            <a class="nav-link modern-nav-toggle pr-0" data-toggle="collapse"
              ><i
                class="d-block d-xl-none text-primary toggle-icon font-medium-4"
                data-feather="x"
              ></i
              ><i
                class="d-none d-xl-block collapse-toggle-icon font-medium-4 text-primary"
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
          <nav-item
            class="nav-item"
            v-for="(m, index) in menus"
            :value="m"
            :key="index"
          ></nav-item>

          <li class="navigation-header">
            <span data-i18n="Apps &amp; Pages">Apps &amp; Pages</span
            ><i data-feather="more-horizontal"></i>
          </li>

          <li class="nav-item">
            <router-link class="d-flex align-items-center" to="/User"
              ><i class="fa fa-user"></i
              ><span class="menu-title text-truncate" data-i18n="Email"
                >User1</span
              ></router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="d-flex align-items-center" to="/UserGroup"
              ><i data-feather="mail"></i
              ><span class="menu-title text-truncate" data-i18n="Email"
                >User Group</span
              ></router-link
            >
          </li>

          <li class="navigation-header">
            <span data-i18n="Misc">Misc</span
            ><i data-feather="more-horizontal"></i>
          </li>
          <li class="nav-item">
            <a class="d-flex align-items-center" href="#"
              ><i data-feather="menu"></i
              ><span class="menu-title text-truncate" data-i18n="Menu Levels"
                >Menu Levels</span
              ></a
            >
            <ul class="menu-content">
              <li>
                <a class="d-flex align-items-center" href="#"
                  ><i data-feather="circle"></i
                  ><span class="menu-item" data-i18n="Second Level"
                    >Second Level 2.1</span
                  ></a
                >
              </li>
              <li>
                <a class="d-flex align-items-center" href="#"
                  ><i data-feather="circle"></i
                  ><span class="menu-item" data-i18n="Second Level"
                    >Second Level 2.2</span
                  ></a
                >
                <ul class="menu-content">
                  <li>
                    <a class="d-flex align-items-center" href="#"
                      ><span class="menu-item" data-i18n="Third Level"
                        >Third Level 3.1</span
                      ></a
                    >
                  </li>
                  <li>
                    <a class="d-flex align-items-center" href="#"
                      ><span class="menu-item" data-i18n="Third Level"
                        >Third Level 3.2</span
                      ></a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="disabled nav-item">
            <a class="d-flex align-items-center" href="#"
              ><i data-feather="eye-off"></i
              ><span class="menu-title text-truncate" data-i18n="Disabled Menu"
                >Disabled Menu</span
              ></a
            >
          </li>
        </ul>
      </div>
    </div>
    <!-- END: Main Menu-->

    <!-- BEGIN: Content-->
    <div class="app-content content">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
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
          <div
            class="content-header-right text-md-right col-md-3 col-12 d-md-block d-none"
          >
            <div class="form-group breadcrumb-right">
              <div class="dropdown">
                <button
                  class="btn-icon btn btn-primary btn-round btn-sm dropdown-toggle"
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
          </div>
        </div>
        <div class="content-body" ref="content"></div>
      </div>
    </div>
    <!-- END: Content-->

    <!-- BEGIN: Customizer-->
    <div class="customizer d-none d-md-block">
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
                checked
                data-layout=""
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
                checked
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
                class="color-box bg-white border selected"
                data-navbar-default=""
              ></li>
              <li
                class="color-box bg-primary"
                data-navbar-color="bg-primary"
              ></li>
              <li
                class="color-box bg-secondary"
                data-navbar-color="bg-secondary"
              ></li>
              <li
                class="color-box bg-success"
                data-navbar-color="bg-success"
              ></li>
              <li
                class="color-box bg-danger"
                data-navbar-color="bg-danger"
              ></li>
              <li class="color-box bg-info" data-navbar-color="bg-info"></li>
              <li
                class="color-box bg-warning"
                data-navbar-color="bg-warning"
              ></li>
              <li class="color-box bg-dark" data-navbar-color="bg-dark"></li>
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
                checked
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
                checked
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

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <!-- BEGIN: Footer-->
    <footer class="footer footer-static footer-light">
      <p class="clearfix mb-0">
        <span class="float-md-left d-block d-md-inline-block mt-25"
          >COPYRIGHT &copy; 2020<a
            class="ml-25"
            href="https://1.envato.market/pixinvent_portfolio"
            target="_blank"
            >Pixinvent</a
          ><span class="d-none d-sm-inline-block"
            >, All rights Reserved</span
          ></span
        ><span class="float-md-right d-none d-md-block"
          >Hand-crafted & Made with<i data-feather="heart"></i
        ></span>
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
export default {
  name: "App",
  data() {
    return {
      menus: [],
      language: [],
      title: "",
      module_name: "",
      breadcrumb: [],
    };
  },
  components: {
    NavItem,
  },
  async created() {
    let resp = await fetch("config.json");
    await this.$vx.init(await resp.json());
    this.menus = this.$vx.menus;
    this.language = this.$vx.language;
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

    await this.renderContent(this.$route.path);
  },

  watch: {
    async $route(to) {
      this.renderContent(to.path);
    },
  },
  methods: {
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

      if (paths.length > 2) {
        this.breadcrumb.push({
          to: paths[1],
          label: paths[1],
        });
      }

      if (resp.headers["content-type"] == "text/html; charset=UTF-8") {
        content = resp.data;
      } else {
        resp = resp.data;
        if (resp.status == 301) {
          //redirect
          this.$router.push(resp.location);
          return;
        }

        if (resp.status == 401) {
          //
          this.$emit("logout");
          this.$router.push("/");
        }
        if (resp.data.header) {
          this.title = resp.data.header.title;
        }

        content = resp.data.body;
      }

      window.$(this.$refs.content).html(content);
    },
    changeLanguage(language) {
      console.log("change to ", language);
    },
  },
};
</script>
