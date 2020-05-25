import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: {
      icon: 'th-large',
      pack: 'solid'
    },
    link: '/pages/dashboard',
  },
  {
    title: 'Vehicles',
    icon: {
      icon: 'shuttle-van',
      pack: 'solid'
    },
    link: '/pages/vehicles/list',
    home: true,
  },
  {
    title: 'Assign Vehicles',
    icon:  {
      icon: 'truck',
      pack: 'solid'},
    link: '/pages/vehicles/assign-vehicles',
    home: true,
  },
  {
    title: 'Services',
    icon: {
      icon: 'headset',
      pack: 'solid'},
    link: '/pages/services/list',
    home: true,
  },

  {
    title: 'Expenses',
    icon: {
      icon: 'file-invoice-dollar',
      pack: 'solid'},

      children: [
        {
          title: 'List',
          link: '/pages/expenses/list',
        },
        {
          title: 'Summary',
          link: '/pages/reports/expense-summary',
        }
      ]
    // link: '',
    // home: true,
  },

  {
    title: 'Employee',
    icon: {
      icon: 'file-invoice-dollar',
      pack: 'solid'},

      children: [
        {
          title: 'List',
          link: '/pages/employee/empList',
        }
        
        // ,
        // {
        //   title: 'Summary',
        //   link: '/pages/reports/expense-summary',
        // }
      ]
    // link: '',
    // home: true,
  },
  {
    title: 'Repairs/Complaint',
    icon: {
      icon: 'comment-alt',
      pack: 'regular',
    },
    link: '/pages/complaint/list',
    home: true,
  },
  {
    title: 'Fuel',
    icon: {
      icon: 'gas-pump',
      pack: 'solid'
    },
    link: '/pages/fuel/list',
    home: true,
  },
  {
    title: 'Notes',
    icon: {
      icon: 'clipboard',
      pack: 'regular'},
    link: '/pages/notes/list',
  },
  {
    title: 'Remainders',
    icon: {
      icon: 'bell',
      pack: 'regular'},
    home: true,
    children: [
      {
        title: 'List',
        link: '/pages/remainders/list'
      },
      {
        title: 'Report',
        link:'/pages/remainders/report'
      }
    ]
  },

  {
    title: 'Reports',
    icon: {
      icon: 'file-contract',
      pack: 'solid'},

      children: [
              {
                title: 'Vehicle',
                link: '/pages/reports/vehicle'
              },
              {
                title: 'Assign Vehicle',
                link: '/pages/reports/assign-vehicle'
              },
              {
                title: 'Vehicle Services',
                link: '/pages/reports/vehicle-services'
              },
              {
                title: 'Expenses',
                link: '/pages/reports/vehicle-expenses'
              },
              {
                title: 'Fuel',
                link: '/pages/reports/fuel'
              },
              {
                title: 'Issue',
                link: '/pages/reports/issue'
              },
              {
                title: 'Contact',
                link: '/pages/reports/contact'
              }
      ]
    // link: '/pages/reports/list',
    // home: true,
  },
  {
    title: 'Contacts',
    icon: {
      icon: 'clipboard',
      pack: 'regular'},
    link: '/pages/contacts/contact-list',
  }

];


// export const MENU_ITEMS: NbMenuItem[] = [
//   {
//     title: 'E-commerce',
//     icon: 'shopping-cart-outline',
//     link: '/pages/dashboard',
//     home: true,
//   },
//   {
//     title: 'IoT Dashboard',
//     icon: 'home-outline',
//     link: '/pages/iot-dashboard',
//   },
//   {
//     title: 'FEATURES',
//     group: true,
//   },
//   {
//     title: 'Layout',
//     icon: 'layout-outline',
//     children: [
//       {
//         title: 'Stepper',
//         link: '/pages/layout/stepper',
//       },
//       {
//         title: 'List',
//         link: '/pages/layout/list',
//       },
//       {
//         title: 'Infinite List',
//         link: '/pages/layout/infinite-list',
//       },
//       {
//         title: 'Accordion',
//         link: '/pages/layout/accordion',
//       },
//       {
//         title: 'Tabs',
//         pathMatch: 'prefix',
//         link: '/pages/layout/tabs',
//       },
//     ],
//   },
//   {
//     title: 'Forms',
//     icon: 'edit-2-outline',
//     children: [
//       {
//         title: 'Form Inputs',
//         link: '/pages/forms/inputs',
//       },
//       {
//         title: 'Form Layouts',
//         link: '/pages/forms/layouts',
//       },
//       {
//         title: 'Buttons',
//         link: '/pages/forms/buttons',
//       },
//       {
//         title: 'Datepicker',
//         link: '/pages/forms/datepicker',
//       },
//     ],
//   },
//   {
//     title: 'UI Features',
//     icon: 'keypad-outline',
//     link: '/pages/ui-features',
//     children: [
//       {
//         title: 'Grid',
//         link: '/pages/ui-features/grid',
//       },
//       {
//         title: 'Icons',
//         link: '/pages/ui-features/icons',
//       },
//       {
//         title: 'Typography',
//         link: '/pages/ui-features/typography',
//       },
//       {
//         title: 'Animated Searches',
//         link: '/pages/ui-features/search-fields',
//       },
//     ],
//   },
//   {
//     title: 'Modal & Overlays',
//     icon: 'browser-outline',
//     children: [
//       {
//         title: 'Dialog',
//         link: '/pages/modal-overlays/dialog',
//       },
//       {
//         title: 'Window',
//         link: '/pages/modal-overlays/window',
//       },
//       {
//         title: 'Popover',
//         link: '/pages/modal-overlays/popover',
//       },
//       {
//         title: 'Toastr',
//         link: '/pages/modal-overlays/toastr',
//       },
//       {
//         title: 'Tooltip',
//         link: '/pages/modal-overlays/tooltip',
//       },
//     ],
//   },
//   {
//     title: 'Extra Components',
//     icon: 'message-circle-outline',
//     children: [
//       {
//         title: 'Calendar',
//         link: '/pages/extra-components/calendar',
//       },
//       {
//         title: 'Progress Bar',
//         link: '/pages/extra-components/progress-bar',
//       },
//       {
//         title: 'Spinner',
//         link: '/pages/extra-components/spinner',
//       },
//       {
//         title: 'Alert',
//         link: '/pages/extra-components/alert',
//       },
//       {
//         title: 'Calendar Kit',
//         link: '/pages/extra-components/calendar-kit',
//       },
//       {
//         title: 'Chat',
//         link: '/pages/extra-components/chat',
//       },
//     ],
//   },
//   {
//     title: 'Maps',
//     icon: 'map-outline',
//     children: [
//       {
//         title: 'Google Maps',
//         link: '/pages/maps/gmaps',
//       },
//       {
//         title: 'Leaflet Maps',
//         link: '/pages/maps/leaflet',
//       },
//       {
//         title: 'Bubble Maps',
//         link: '/pages/maps/bubble',
//       },
//       {
//         title: 'Search Maps',
//         link: '/pages/maps/searchmap',
//       },
//     ],
//   },
//   {
//     title: 'Charts',
//     icon: 'pie-chart-outline',
//     children: [
//       {
//         title: 'Echarts',
//         link: '/pages/charts/echarts',
//       },
//       {
//         title: 'Charts.js',
//         link: '/pages/charts/chartjs',
//       },
//       {
//         title: 'D3',
//         link: '/pages/charts/d3',
//       },
//     ],
//   },
//   {
//     title: 'Editors',
//     icon: 'text-outline',
//     children: [
//       {
//         title: 'TinyMCE',
//         link: '/pages/editors/tinymce',
//       },
//       {
//         title: 'CKEditor',
//         link: '/pages/editors/ckeditor',
//       },
//     ],
//   },
//   {
//     title: 'Tables & Data',
//     icon: 'grid-outline',
//     children: [
//       {
//         title: 'Smart Table',
//         link: '/pages/tables/smart-table',
//       },
//       {
//         title: 'Tree Grid',
//         link: '/pages/tables/tree-grid',
//       },
//     ],
//   },
//   {
//     title: 'Miscellaneous',
//     icon: 'shuffle-2-outline',
//     children: [
//       {
//         title: '404',
//         link: '/pages/miscellaneous/404',
//       },
//     ],
//   },
//   {
//     title: 'Auth',
//     icon: 'lock-outline',
//     children: [
//       {
//         title: 'Login',
//         link: '/auth/login',
//       },
//       {
//         title: 'Register',
//         link: '/auth/register',
//       },
//       {
//         title: 'Request Password',
//         link: '/auth/request-password',
//       },
//       {
//         title: 'Reset Password',
//         link: '/auth/reset-password',
//       },
//     ],
//   },
// ];
