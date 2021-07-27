<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner row m-0">
      <!-- Brand logo--><a class="brand-logo" href="javascript:void(0);">
        <h2 class="brand-text text-primary ml-1">Vuexy</h2>
      </a>
      <!-- /Brand logo-->
      <!-- Left Text-->
      <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <img
            src="/images/pages/reset-password-v2.svg"
            img-fluid="img-fluid"
            alt="Register V2"
          />
        </div>
      </div>
      <!-- /Left Text-->
      <!-- Reset password-->
      <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
        <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
          <h4 class="card-title mb-1">Reset Password 🔒</h4>
          <p class="card-text mb-2">
            Your new password must be different from previously used passwords
          </p>
          <form
            class="auth-reset-password-form mt-2"
            action="page-auth-login-v2.html"
            method="POST"
          >
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <label for="reset-password-new">New Password</label>
              </div>
              <div class="input-group input-group-merge form-password-toggle">
                <input
                  class="form-control form-control-merge"
                  id="reset-password-new"
                  type="password"
                  name="reset-password-new"
                  placeholder="············"
                  aria-describedby="reset-password-new"
                  autofocus=""
                  tabindex="1"
                />
                <div class="input-group-append">
                  <span class="input-group-text cursor-pointer"
                    ><i data-feather="eye"></i
                  ></span>
                </div>
              </div>
            </div>
            <div class="form-group">
              <div class="d-flex justify-content-between">
                <label for="reset-password-confirm">Confirm Password</label>
              </div>
              <div class="input-group input-group-merge form-password-toggle">
                <input
                  class="form-control form-control-merge"
                  id="reset-password-confirm"
                  type="password"
                  name="reset-password-confirm"
                  placeholder="············"
                  aria-describedby="reset-password-confirm"
                  tabindex="2"
                />
                <div class="input-group-append">
                  <span class="input-group-text cursor-pointer"
                    ><i data-feather="eye"></i
                  ></span>
                </div>
              </div>
            </div>
            <button class="btn btn-primary btn-block" tabindex="3">
              Set New Password
            </button>
          </form>
          <p class="text-center mt-2">
            <a href="page-auth-login-v2.html"
              ><i data-feather="chevron-left"></i> Back to login</a
            >
          </p>
        </div>
      </div>
      <!-- /Reset password-->
    </div>
  </div>
</template>
