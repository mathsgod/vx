<template>
  <!-- File Info Sidebar Starts-->
  <div
    class="modal modal-slide-in fade show"
    id="app-file-manager-info-sidebar"
  >
    <div class="modal-dialog sidebar-lg">
      <div class="modal-content p-0">
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
          <h5 class="modal-title">menu.js</h5>
          <div>
            <i
              data-feather="trash"
              class="cursor-pointer mr-50"
              data-dismiss="modal"
            ></i>
            <i data-feather="x" class="cursor-pointer" data-dismiss="modal"></i>
          </div>
        </div>
        <div class="modal-body flex-grow-1 pb-sm-0 pb-1">
          <ul class="nav nav-tabs tabs-line" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active"
                data-toggle="tab"
                href="#details-tab"
                role="tab"
                aria-controls="details-tab"
                aria-selected="true"
              >
                <i data-feather="file"></i>
                <span class="align-middle ml-25">Details</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#activity-tab"
                role="tab"
                aria-controls="activity-tab"
                aria-selected="true"
              >
                <i data-feather="activity"></i>
                <span class="align-middle ml-25">Activity</span>
              </a>
            </li>
          </ul>
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
                <img src="/images/icons/js.png" alt="file-icon" height="64" />
                <p class="mb-0 mt-1">54kb</p>
              </div>
              <h6 class="file-manager-title my-2">Settings</h6>
              <ul class="list-unstyled">
                <li
                  class="d-flex justify-content-between align-items-center mb-1"
                >
                  <span>File Sharing</span>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="sharing"
                    />
                    <label class="custom-control-label" for="sharing"></label>
                  </div>
                </li>
                <li
                  class="d-flex justify-content-between align-items-center mb-1"
                >
                  <span>Synchronization</span>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      checked
                      id="sync"
                    />
                    <label class="custom-control-label" for="sync"></label>
                  </div>
                </li>
                <li
                  class="d-flex justify-content-between align-items-center mb-1"
                >
                  <span>Backup</span>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="backup"
                    />
                    <label class="custom-control-label" for="backup"></label>
                  </div>
                </li>
              </ul>
              <hr class="my-2" />
              <h6 class="file-manager-title my-2">Info</h6>
              <ul class="list-unstyled">
                <li class="d-flex justify-content-between align-items-center">
                  <p>Type</p>
                  <p class="font-weight-bold">JS</p>
                </li>
                <li class="d-flex justify-content-between align-items-center">
                  <p>Size</p>
                  <p class="font-weight-bold">54kb</p>
                </li>
                <li class="d-flex justify-content-between align-items-center">
                  <p>Location</p>
                  <p class="font-weight-bold">Files > Documents</p>
                </li>
                <li class="d-flex justify-content-between align-items-center">
                  <p>Owner</p>
                  <p class="font-weight-bold">Sheldon Cooper</p>
                </li>
                <li class="d-flex justify-content-between align-items-center">
                  <p>Modified</p>
                  <p class="font-weight-bold">12th Aug, 2020</p>
                </li>

                <li class="d-flex justify-content-between align-items-center">
                  <p>Created</p>
                  <p class="font-weight-bold">01 Oct, 2019</p>
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
  </div>
  <!-- File Info Sidebar Ends -->
</template>