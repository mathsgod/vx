<template>
  <!-- File Info Sidebar Starts-->
  <div>
    <div class="p-0">
      <div
        class="
          modal-header
          d-flex
          align-items-center
          justify-content-between
          mb-1
          p-2
        "
      >
        <h5 class="modal-title" v-text="data.name"></h5>
      </div>
      <div class="modal-body flex-grow-1 pb-sm-0 pb-1">
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="details-tab"
            role="tabpanel"
            aria-labelledby="details-tab"
          >
            <div
              class="
                d-flex
                flex-column
                justify-content-center
                align-items-center
                py-5
              "
            >
              <i :class="data.icon" class="fa-6x"></i>
              <p class="mb-0 mt-1" v-text="data.size_display"></p>
            </div>

            <h6 class="file-manager-title my-2">Info</h6>
            <ul class="list-unstyled">
              <li class="d-flex justify-content-between align-items-center">
                <p>Type</p>
                <p class="font-weight-bold" v-text="data.extension"></p>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                <p>Mime type</p>
                <p class="font-weight-bold" v-text="data.mime_type"></p>
              </li>

              <li class="d-flex justify-content-between align-items-center">
                <p>Size</p>
                <p class="font-weight-bold" v-text="data.size"></p>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                <p>Location</p>
                <p class="font-weight-bold" v-text="data.path"></p>
              </li>
              <li class="d-flex justify-content-between align-items-center">
                <p>Modified</p>
                <p class="font-weight-bold" v-text="data.last_modified"></p>
              </li>
            </ul>
          </div>
          <div
            class="tab-pane fade"
            id="activity-tab"
            role="tabpanel"
            aria-labelledby="activity-tab"
          >
            <h6 class="file-manager-title my-2">Today</h6>
            <div class="media align-items-center mb-2">
              <div class="avatar avatar-sm mr-50">
                <img
                  src="/images/avatars/5-small.png"
                  alt="avatar"
                  width="28"
                />
              </div>
              <div class="media-body">
                <p class="mb-0">
                  <span class="font-weight-bold">Mae</span>
                  shared the file with
                  <span class="font-weight-bold">Howard</span>
                </p>
              </div>
            </div>
            <div class="media align-items-center">
              <div class="avatar avatar-sm bg-light-primary mr-50">
                <span class="avatar-content">SC</span>
              </div>
              <div class="media-body">
                <p class="mb-0">
                  <span class="font-weight-bold">Sheldon</span>
                  updated the file
                </p>
              </div>
            </div>
            <h6 class="file-manager-title mt-3 mb-2">Yesterday</h6>
            <div class="media align-items-center mb-2">
              <div class="avatar avatar-sm bg-light-success mr-50">
                <span class="avatar-content">LH</span>
              </div>
              <div class="media-body">
                <p class="mb-0">
                  <span class="font-weight-bold">Leonard</span>
                  renamed this file to
                  <span class="font-weight-bold">menu.js</span>
                </p>
              </div>
            </div>
            <div class="media align-items-center">
              <div class="avatar avatar-sm mr-50">
                <img
                  src="/images/portrait/small/avatar-s-1.jpg"
                  alt="Avatar"
                  width="28"
                />
              </div>
              <div class="media-body">
                <p class="mb-0">
                  <span class="font-weight-bold">You</span>
                  shared this file with Leonard
                </p>
              </div>
            </div>
            <h6 class="file-manager-title mt-3 mb-2">3 days ago</h6>
            <div class="media">
              <div class="avatar avatar-sm mr-50">
                <img
                  src="/images/portrait/small/avatar-s-1.jpg"
                  alt="Avatar"
                  width="28"
                />
              </div>
              <div class="media-body">
                <p class="mb-50">
                  <span class="font-weight-bold">You</span>
                  uploaded this file
                </p>
                <img
                  src="/images/icons/js.png"
                  alt="Avatar"
                  class="mr-50"
                  height="24"
                />
                <span class="font-weight-bold">app.js</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- File Info Sidebar Ends -->
</template>

<script>
export default {
  props: {
    data: Object,
  },
  created() {
    console.log(this.data);
  },
};
</script>