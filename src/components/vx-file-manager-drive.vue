<template>
  <!-- drives area starts-->
  <div class="drives">
    <div class="row">
      <div class="col-12">
        <h6 class="files-section-title mb-75">Drives</h6>
      </div>
      <div class="col-lg-3 col-md-6 col-12">
        <div class="card shadow-none border cursor-pointer">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <img
                src="/images/icons/drive.png"
                alt="google drive"
                height="38"
              />
              <div class="dropdown-items-wrapper">
                <i
                  data-feather="more-vertical"
                  id="dropdownMenuLink1"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuLink1"
                >
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="refresh-cw" class="mr-25"></i>
                    <span class="align-middle">Refresh</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="settings" class="mr-25"></i>
                    <span class="align-middle">Manage</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="trash" class="mr-25"></i>
                    <span class="align-middle">Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="my-1">
              <h5>Google drive</h5>
            </div>
            <div class="d-flex justify-content-between mb-50">
              <span class="text-truncate">35GB Used</span>
              <small class="text-muted">50GB</small>
            </div>
            <div
              class="progress progress-bar-warning progress-md mb-0"
              style="height: 10px"
            >
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="70"
                aria-valuemax="100"
                style="width: 70%"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-12">
        <div class="card shadow-none border cursor-pointer">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <img src="/images/icons/dropbox.png" alt="dropbox" height="38" />
              <div class="dropdown-items-wrapper">
                <i
                  data-feather="more-vertical"
                  id="dropdownMenuLink2"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuLink2"
                >
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="refresh-cw" class="mr-25"></i>
                    <span class="align-middle">Refresh</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="settings" class="mr-25"></i>
                    <span class="align-middle">Manage</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="trash" class="mr-25"></i>
                    <span class="align-middle">Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="my-1">
              <h5>Dropbox</h5>
            </div>
            <div class="d-flex justify-content-between mb-50">
              <span class="text-truncate">1.2GB Used</span>
              <small class="text-muted">2GB</small>
            </div>
            <div
              class="progress progress-bar-success progress-md mb-0"
              style="height: 10px"
            >
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="70"
                aria-valuemax="100"
                style="width: 68%"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-12">
        <div class="card shadow-none border cursor-pointer">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <img
                src="/images/icons/onedrivenew.png"
                alt="icloud"
                height="38"
                class="p-25"
              />
              <div class="dropdown-items-wrapper">
                <i
                  data-feather="more-vertical"
                  id="dropdownMenuLink3"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuLink3"
                >
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="refresh-cw" class="mr-25"></i>
                    <span class="align-middle">Refresh</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="settings" class="mr-25"></i>
                    <span class="align-middle">Manage</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="trash" class="mr-25"></i>
                    <span class="align-middle">Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="my-1">
              <h5>OneDrive</h5>
            </div>
            <div class="d-flex justify-content-between mb-50">
              <span class="text-truncate">1.6GB Used</span>
              <small class="text-muted">2GB</small>
            </div>
            <div
              class="progress progress-bar-primary progress-md mb-0"
              style="height: 10px"
            >
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="70"
                aria-valuemax="100"
                style="width: 80%"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-12">
        <div class="card shadow-none border cursor-pointer">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <img
                src="/images/icons/icloud-1.png"
                alt="icloud"
                height="38"
                class="p-25"
              />
              <div class="dropdown-items-wrapper">
                <span
                  data-feather="more-vertical"
                  id="dropdownMenuLink4"
                  role="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                ></span>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuLink4"
                >
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="refresh-cw" class="mr-25"></i>
                    <span class="align-middle">Refresh</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="settings" class="mr-25"></i>
                    <span class="align-middle">Manage</span>
                  </a>
                  <a class="dropdown-item" href="javascript:void(0)">
                    <i data-feather="trash" class="mr-25"></i>
                    <span class="align-middle">Delete</span>
                  </a>
                </div>
              </div>
            </div>
            <div class="my-1">
              <h5>iCloud</h5>
            </div>
            <div class="d-flex justify-content-between mb-50">
              <span class="text-truncate">1.8GB Used</span>
              <small class="text-muted">3GB</small>
            </div>
            <div
              class="progress progress-bar-info progress-md mb-0"
              style="height: 10px"
            >
              <div
                class="progress-bar"
                role="progressbar"
                aria-valuenow="100"
                aria-valuemin="70"
                aria-valuemax="100"
                style="width: 60%"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- drives area ends-->
</template>