function index() {
  return import(/* webpackChunkName: "index" */ './pages/index.vue')
}
function auth_login_basic() {
  return import(
    /* webpackChunkName: "auth-login-basic" */ './pages/auth-login-basic.vue'
  )
}
function cancel_view_as() {
  return import(
    /* webpackChunkName: "cancel-view-as" */ './pages/cancel-view-as.vue'
  )
}
function ACL_index() {
  return import(/* webpackChunkName: "ACL-index" */ './pages/ACL/index.vue')
}
function Config_index() {
  return import(
    /* webpackChunkName: "Config-index" */ './pages/Config/index.vue'
  )
}
function Dashboard_index() {
  return import(
    /* webpackChunkName: "Dashboard-index" */ './pages/Dashboard/index.vue'
  )
}
function EventLog_index() {
  return import(
    /* webpackChunkName: "EventLog-index" */ './pages/EventLog/index.vue'
  )
}
function FileManager_index() {
  return import(
    /* webpackChunkName: "FileManager-index" */ './pages/FileManager/index.vue'
  )
}
function MailLog_index() {
  return import(
    /* webpackChunkName: "MailLog-index" */ './pages/MailLog/index.vue'
  )
}
function System_index() {
  return import(
    /* webpackChunkName: "System-index" */ './pages/System/index.vue'
  )
}
function User_index() {
  return import(/* webpackChunkName: "User-index" */ './pages/User/index.vue')
}
function UserGroup_index() {
  return import(
    /* webpackChunkName: "UserGroup-index" */ './pages/UserGroup/index.vue'
  )
}
function UserLog_index() {
  return import(
    /* webpackChunkName: "UserLog-index" */ './pages/UserLog/index.vue'
  )
}
function ACL_all() {
  return import(/* webpackChunkName: "ACL-all" */ './pages/ACL/all.vue')
}
function Config_add() {
  return import(/* webpackChunkName: "Config-add" */ './pages/Config/add.vue')
}
function System_mail_test() {
  return import(
    /* webpackChunkName: "System-mail-test" */ './pages/System/mail-test.vue'
  )
}
function System_package() {
  return import(
    /* webpackChunkName: "System-package" */ './pages/System/package.vue'
  )
}
function System_phpinfo() {
  return import(
    /* webpackChunkName: "System-phpinfo" */ './pages/System/phpinfo.vue'
  )
}
function System_setting() {
  return import(
    /* webpackChunkName: "System-setting" */ './pages/System/setting.vue'
  )
}
function System_view_as() {
  return import(
    /* webpackChunkName: "System-view-as" */ './pages/System/view-as.vue'
  )
}
function User_add() {
  return import(/* webpackChunkName: "User-add" */ './pages/User/add.vue')
}
function User_profile() {
  return import(
    /* webpackChunkName: "User-profile" */ './pages/User/profile.vue'
  )
}
function User_setting() {
  return import(
    /* webpackChunkName: "User-setting" */ './pages/User/setting.vue'
  )
}
function User_setting_2fa() {
  return import(
    /* webpackChunkName: "User-setting-2fa" */ './pages/User/setting/2fa.vue'
  )
}
function User_setting_bio_auth() {
  return import(
    /* webpackChunkName: "User-setting-bio-auth" */ './pages/User/setting/bio-auth.vue'
  )
}
function User_setting_general() {
  return import(
    /* webpackChunkName: "User-setting-general" */ './pages/User/setting/general.vue'
  )
}
function User_setting_information() {
  return import(
    /* webpackChunkName: "User-setting-information" */ './pages/User/setting/information.vue'
  )
}
function User_setting_password() {
  return import(
    /* webpackChunkName: "User-setting-password" */ './pages/User/setting/password.vue'
  )
}
function User_setting_style() {
  return import(
    /* webpackChunkName: "User-setting-style" */ './pages/User/setting/style.vue'
  )
}
function UserGroup_add() {
  return import(
    /* webpackChunkName: "UserGroup-add" */ './pages/UserGroup/add.vue'
  )
}
function System_database_charset() {
  return import(
    /* webpackChunkName: "System-database-charset" */ './pages/System/database/charset.vue'
  )
}
function System_database_table() {
  return import(
    /* webpackChunkName: "System-database-table" */ './pages/System/database/table.vue'
  )
}
function System_test_codemirror() {
  return import(
    /* webpackChunkName: "System-test-codemirror" */ './pages/System/test/codemirror.vue'
  )
}
function System_test_tinymce() {
  return import(
    /* webpackChunkName: "System-test-tinymce" */ './pages/System/test/tinymce.vue'
  )
}
function EventLog__id_view() {
  return import(
    /* webpackChunkName: "EventLog-id-view" */ './pages/EventLog/_id/view.vue'
  )
}
function User__id_edit() {
  return import(
    /* webpackChunkName: "User-id-edit" */ './pages/User/_id/edit.vue'
  )
}
function User__id_view() {
  return import(
    /* webpackChunkName: "User-id-view" */ './pages/User/_id/view.vue'
  )
}
function UserGroup__id_edit() {
  return import(
    /* webpackChunkName: "UserGroup-id-edit" */ './pages/UserGroup/_id/edit.vue'
  )
}
function UserGroup__id_view() {
  return import(
    /* webpackChunkName: "UserGroup-id-view" */ './pages/UserGroup/_id/view.vue'
  )
}

export default [
  {
    name: 'index',
    path: '/',
    component: index,
  },
  {
    name: 'auth-login-basic',
    path: '/auth-login-basic',
    component: auth_login_basic,
  },
  {
    name: 'cancel-view-as',
    path: '/cancel-view-as',
    component: cancel_view_as,
  },
  {
    name: 'ACL',
    path: '/ACL',
    component: ACL_index,
  },
  {
    name: 'Config',
    path: '/Config',
    component: Config_index,
  },
  {
    name: 'Dashboard',
    path: '/Dashboard',
    component: Dashboard_index,
  },
  {
    name: 'EventLog',
    path: '/EventLog',
    component: EventLog_index,
  },
  {
    name: 'FileManager',
    path: '/FileManager',
    component: FileManager_index,
  },
  {
    name: 'MailLog',
    path: '/MailLog',
    component: MailLog_index,
  },
  {
    name: 'System',
    path: '/System',
    component: System_index,
  },
  {
    name: 'User',
    path: '/User',
    component: User_index,
  },
  {
    name: 'UserGroup',
    path: '/UserGroup',
    component: UserGroup_index,
  },
  {
    name: 'UserLog',
    path: '/UserLog',
    component: UserLog_index,
  },
  {
    name: 'ACL-all',
    path: '/ACL/all',
    component: ACL_all,
  },
  {
    name: 'Config-add',
    path: '/Config/add',
    component: Config_add,
  },
  {
    name: 'System-mail-test',
    path: '/System/mail-test',
    component: System_mail_test,
  },
  {
    name: 'System-package',
    path: '/System/package',
    component: System_package,
  },
  {
    name: 'System-phpinfo',
    path: '/System/phpinfo',
    component: System_phpinfo,
  },
  {
    name: 'System-setting',
    path: '/System/setting',
    component: System_setting,
  },
  {
    name: 'System-view-as',
    path: '/System/view-as',
    component: System_view_as,
  },
  {
    name: 'User-add',
    path: '/User/add',
    component: User_add,
  },
  {
    name: 'User-profile',
    path: '/User/profile',
    component: User_profile,
  },
  {
    name: 'User-setting',
    path: '/User/setting',
    component: User_setting,
    children: [
      {
        name: 'User-setting-2fa',
        path: '2fa',
        component: User_setting_2fa,
      },
      {
        name: 'User-setting-bio-auth',
        path: 'bio-auth',
        component: User_setting_bio_auth,
      },
      {
        name: 'User-setting-general',
        path: 'general',
        component: User_setting_general,
      },
      {
        name: 'User-setting-information',
        path: 'information',
        component: User_setting_information,
      },
      {
        name: 'User-setting-password',
        path: 'password',
        component: User_setting_password,
      },
      {
        name: 'User-setting-style',
        path: 'style',
        component: User_setting_style,
      },
    ],
  },
  {
    name: 'UserGroup-add',
    path: '/UserGroup/add',
    component: UserGroup_add,
  },
  {
    name: 'System-database-charset',
    path: '/System/database/charset',
    component: System_database_charset,
  },
  {
    name: 'System-database-table',
    path: '/System/database/table',
    component: System_database_table,
  },
  {
    name: 'System-test-codemirror',
    path: '/System/test/codemirror',
    component: System_test_codemirror,
  },
  {
    name: 'System-test-tinymce',
    path: '/System/test/tinymce',
    component: System_test_tinymce,
  },
  {
    name: 'EventLog-id-view',
    path: '/EventLog/:id/view',
    component: EventLog__id_view,
  },
  {
    name: 'User-id-edit',
    path: '/User/:id/edit',
    component: User__id_edit,
  },
  {
    name: 'User-id-view',
    path: '/User/:id/view',
    component: User__id_view,
  },
  {
    name: 'UserGroup-id-edit',
    path: '/UserGroup/:id/edit',
    component: UserGroup__id_edit,
  },
  {
    name: 'UserGroup-id-view',
    path: '/UserGroup/:id/view',
    component: UserGroup__id_view,
  },
]
