export const initTicketsData = [
    // Closed this.app Tickets (40)
   {
        number: 1,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add navigation sidebar component",
        description: `Generate a component to serve as a navigation sidebar menu.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 9, 2022 11:11:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 9, 2022 11:37:00"),
                update: `Nelson updated Status from Open to Pending.<br>`
            },
            {
                date: new Date("April 9, 2022 11:41:00"),
                update: `Nelson commented "Generated side-navbar component."<br>
                        Nelson updated Status from Pending to Closed.`
            }
        ],
        highlighted: false
    },
    {
        number: 2,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Style navigation sidebar component",
        description: `Style the menu design to resemble the explorer filetree used in VS Code`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 09:32:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 09:33:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 10, 2022 14:12:00"),
                update: `Nelson commented "Styled menu items to appear as a list, resembling the explorer filetree in VS Code."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 3,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add page interface + array of object implementations",
        description: `Create an interface to represent webpages and create each page object in an array of pages.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 09:35:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 09:36:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 10:12:00"),
                update: `Nelson commented "Generated Page interface plus created an array of pages, with all properties populated."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 4,
        priority: "High",
        type: "Feature",
        project: "this.app",
        title: "Add tab service",
        description: `Generate service for shared handling of page/tab management.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 10:15:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 10:16:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 10:41:00"),
                update: `Nelson commented "Generated service with private properties and public methods."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 5,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add feature to collapse/expand navigation sidebar",
        description: `Create method to toggle + collapse navigation sidebar.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 10:48:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 10:50:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 11:03:00"),
                update: `Nelson commented "Created boolean to store collapsed/expanded status, + methods to toggle boolean and set to false. Value used for ngClass with width styles."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 6,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add feature to collapse/expand folder menu page(s) on click",
        description: `If menu page is a folder, with subpages, add functionality to toggle menu item to expand/collapse, to therefore reveal/hide nested list of subpage menu items`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 11:22:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 11:23:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 11:47:00"),
                update: `Nelson commented "Expandable/Collapsible folder page menu items functionality implemented."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 7,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add tab headers component",
        description: `Create component to display all open pages' tab headers.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 14:37:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 14:40:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 14:43:00"),
                update: `Nelson commented "Generated tab-headers component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 8,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Style tab headers component",
        description: `Style each tab head to closely resemble tabs in VS Code.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 14:52:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 14:55:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 15:33:00"),
                update: `Nelson commented "Styled tab heads to resemble tabs in VS Code."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 9,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add functionality to add/remove tabs",
        description: `Create methods in shared tab service to add pages as open tabs via the nav menu and remove/close tabs via tab-headers.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 15:42:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 15:45:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 16:18:00"),
                update: `Nelson commented "Implemented methods and openTabs property in shared tab service to open/close tabs."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 10,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add shared tab selection logic",
        description: `Create methods to select/deselect open tabs, to be used initially to style menu item in side-navbar and tab-header.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 10, 2022 16:33:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 10, 2022 16:35:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 10, 2022 17:01:00"),
                update: `Nelson commented "Implemented methods in shared tab service to select/deselect open tabs."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 11,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add feature to style selected page in side-navbar and tab header",
        description: `Apply ngClass if page is selected, to highlight menu item and tab head.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 09:03:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 09:05:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 09:21:00"),
                update: `Nelson commented "Implemented logic and CSS classes for selected page/tab."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 12,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add feature to scroll selected tab into view on page menu item click in side-navbar",
        description: `Opened tab's header should scroll into view, if tab header container overflows.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 09:23:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 09:24:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 10:01:00"),
                update: `Nelson commented "Implemented scrollIntoView using setTimeout() delay to function as expected."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 13,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add tab-body component",
        description: `Create component to display open page/tab's text content.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 10:04:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 10:06:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 10:11:00"),
                update: `Nelson commented "Generated tab-body component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 14,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add tab-linecount component",
        description: `Create component to display the listed line count of open page/tab's text content.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 10:13:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 10:16:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 10:21:00"),
                update: `Nelson commented "Generated tab-linecount component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 15,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add tab service method to format each page's content value",
        description: `Create method to apply class span wrapping to format string using punctuation.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 10:25:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 10:28:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 11:43"),
                update: `Nelson commented "Method created to format and replace each page's content on tab opening."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 16,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add tab service method to count the total amount of lines for each page's formatted content value",
        description: `Create method to apply count specific punctuation used to format each page's content value.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 11:04:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 11:09:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 11:45"),
                update: `Nelson commented "Method created to count expected lines of each page's content on tab opening."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 17,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Style tab-body component",
        description: `Apply style classes to correspond with page's newly updated formatted content`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 11:49:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 11:53:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 12:22:00"),
                update: `Nelson commented "Style classes created for formatted content's intended presentation."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 18,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add tab-preview component",
        description: `Create component to display the preview components for each page.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 12:26:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 13:29:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 13:34:00"),
                update: `Nelson commented "Generated tab-preview component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 19,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add user-interface component",
        description: `Create UI component to structure grid layout of all app components.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 13:41:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 13:43:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 13:48:00"),
                update: `Nelson commented "Generated user-interface component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 20,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add feature to toggle window/view split between tab-body and tab-preview components",
        description: `Add functionality for user to be able to toggle whether both components share screen, or if either occupies full width of available space`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 13:57:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 14:01:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 14:48:00"),
                update: `Nelson commented "Implemented section view toggle."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 21,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add panel component",
        description: `Create panel component to display simulated terminal log section of UI.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 14:54:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 14:56:00"),
                update: "Nelson updated Status from Open to Pending."
            },
            {
                date: new Date("April 11, 2022 15:02:00"),
                update: `Nelson commented "Generated panel component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 22,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Style panel component",
        description: `Style the panel component and terminal view to resemble the panel + terminal used in VS Code.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 15:05:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 15:07:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 11, 2022 15:42:00"),
                update: `Nelson commented "Styled panel and terminal view to resemble both in VS Code."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 23,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add terminal service",
        description: `Create a terminal service to simulate log entries following app user actions/navigations.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 15:48:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 15:51:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 11, 2022 16:42:00"),
                update: `Nelson commented "Generated terminal service component and simulation methods."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 24,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add splash-screen loading component",
        description: `Create a splash screen/loading view component, to temporarily overlay each page/tab's preview component on opening.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 11, 2022 16:46:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 11, 2022 16:47:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 11, 2022 16:54:00"),
                update: `Nelson commented "Generated splash-screen component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 25,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Style splash-screen SVG logo",
        description: `Style splash-screen SVG logo to resemble VS Code in the shape of an 'N'.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 12, 2022 08:58:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 12, 2022 09:00:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 12, 2022 09:52:00"),
                update: `Nelson commented "Style splash-screen SVG logo with linear gradients in the style of VS Code's logo."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 26,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add animation to splash-screen SVG",
        description: `Animate the splash screen logo SVG elements infinitely.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 12, 2022 10:01:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 12, 2022 10:03:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 12, 2022 10:52:00"),
                update: `Nelson commented "Animated splash screen logo SVG elements with infinite durations."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 27,
        priority: "Medium",
        type: "Feature",
        project: "this.app",
        title: "Add feature to delay splash-screen duration countdown, for localWeather.app",
        description: `Await weatherFetched observable before commening ~3s visibility countdown.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 12, 2022 11:02:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 12, 2022 11:03:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 12, 2022 11:22:00"),
                update: `Nelson commented "Implemented mechanism to await weatherFetched observable subscription, before commening ~3s visibility countdown."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 28,
        priority: "High",
        type: "Feature",
        project: "this.app",
        title: "Add route service and url path logic",
        description: `Create route service with logic to get and set open tabs in order.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 12, 2022 11:26:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 12, 2022 11:28:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 12, 2022 15:27:00"),
                update: `Nelson commented "Generated route service with methods to get and set open tabs in order."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 29,
        priority: "High",
        type: "Feature",
        project: "this.app",
        title: "Add draggable functionality to tab-headers",
        description: `Add ability to drag tab-headers and reposition order within tab-headers container and update url route path`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 12, 2022 15:30:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 12, 2022 15:33:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 12, 2022 17:16:00"),
                update: `Nelson commented "Implemented functionality to drag and reorder open tabs view and url route/path."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 30,
        priority: "High",
        type: "Feature",
        project: "this.app",
        title: "Add feature to resize tab-body + tab-preview components' widths",
        description: `Add feature to enable width resizing of tab-body + tab-preview components when in default split-screen mode.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 09:07:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 12, 2022 09:08:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 12, 2022 14:03:00"),
                update: `Nelson commented "Added Resize 'handle' element with applied Resize directive working as required."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 31,
        priority: "High",
        type: "Feature",
        project: "this.app",
        title: "Add feature to restore tab-body scroll positions on open tab reselections",
        description: `Add feature to store and restore open/selected tab overflow scroll positions following tab reselections.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 12, 2022 14:10:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 12, 2022 14:11:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 10:12:00"),
                update: `Nelson commented "Created tabScrollSetting interface and implemented logic to create an object implementation for each open/selected tab on tab reselection, adding to array of tabScrollSettings. Feature working as required."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 32,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add contact LinkedIn preview component",
        description: `Create component to display linked LinkedIn profile.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 10:45:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 10:46:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 10:59:00"),
                update: `Nelson commented "Generated contact-linkedin component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 33,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Style contact LinkedIn preview component",
        description: `Style component to resemble appearance of linked LinkedIn profile.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 11:01:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 11:02:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 11:34:00"),
                update: `Nelson commented "Styled contact-linkedin component to resemble LinkedIn profile."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 34,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add contact email preview component",
        description: `Create component to display contact form.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 11:38:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 11:40:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 11:44:00"),
                update: `Nelson commented "Generated contact-email component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 35,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Style contact email preview component",
        description: `Style contact form.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 11:47:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 11:49:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 12:34:00"),
                update: `Nelson commented "Styled contact-email component form."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 36,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add feature to show thank you message on form submission",
        description: `Following form submission, display a thank you message.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 13:37:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 13:39:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 14:24:00"),
                update: `Nelson commented "Added mousedown event handler to intercept form submission click event and toggle bool used to display thank you message. Working as required."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 37,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add about me preview component",
        description: `Create component to display about me graphic.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 14:38:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 14:40:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 14:44:00"),
                update: `Nelson commented "Generated about component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 38,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Style about preview component",
        description: `Style about preview component to display graphic with an animated 'Hello World!' welcome message.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 14:49:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 14:50:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 15:37:00"),
                update: `Nelson commented "Styled about component, with animated welcome message, as required."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 39,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add skills preview component",
        description: `Create component to display skill badge icons of frontend tech stack.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 15:38:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 15:39:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 15:43:00"),
                update: `Nelson commented "Generated skills component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 40,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Style skills preview component",
        description: `Style skills badge icons of frontend tech stack to individually animate/appear consecutively.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("April 13, 2022 15:47:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("April 13, 2022 15:49:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("April 13, 2022 16:34:00"),
                update: `Nelson commented "Styled skills badge icons of frontend tech stack to individually display consecutively, as required."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },

    // Closed issueTracker.app Tickets (25)
    {
        number: 80,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add sidenav bar element and menu logic to project component",
        description: `Create a navigation sidebar element and setup menu logic for view selection control.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 12, 2022 08:43:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 12, 2022 08:44:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 12, 2022 10:22:00"),
                update: `Nelson commented "Created navigation sidebar plus 'body' elements." Setup menu logic to control view selections.<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 81,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add collapsible/expandable dynamic styles using provided app width",
        description: `Create dynamic styles for responsive menu widths, taking provided app width into account.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 12, 2022 08:43:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 12, 2022 08:44:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 12, 2022 10:22:00"),
                update: `Nelson commented "Created expandable/collapsible responsive styles for navigation sidebar menu."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 82,
        priority: "High",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add tracker service",
        description: `Create tracker service for shared general project logic.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 12, 2022 10:25:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 12, 2022 10:27:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 12, 2022 10:32:00"),
                update: `Nelson commented "Generated tracker service."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 83,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add ticket-list component",
        description: `Create ticket-list component for dynamic ticket list displays.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 12, 2022 10:34:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 12, 2022 10:36:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 12, 2022 10:41:00"),
                update: `Nelson commented "Generated ticket-list component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 84,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add ticket-form component, with validation",
        description: `Create ticket-form component with input validation checks.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 12, 2022 10:45:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 12, 2022 10:47:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 12, 2022 11:11:00"),
                update: `Nelson commented "Generated ticket-form component. Implemented form with required inputs and validators."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 85,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add ticket-details component, with populated form input fields",
        description: `Create ticket-details component with populated form input fields and validation checks for enabled updates.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 12, 2022 10:45:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 12, 2022 10:47:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 12, 2022 11:11:00"),
                update: `Nelson commented "Generated ticket-details component. Implemented populated form logic with required input and validators for certain enabled updates."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 86,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add bar-chart component, with input logic",
        description: `Create reusable bar-chart component with input logic.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 12, 2022 13:32:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 12, 2022 13:34:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 12, 2022 14:28:00"),
                update: `Nelson commented "Generated bar-chart component. Implemented input property logic."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 87,
        priority: "High",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add chart service for shared supporting logic for chart components",
        description: `Create chart service to control chart elements and provide supporting logic for reusable chart components.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 13, 2022 09:04:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 13, 2022 09:06:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 13, 2022 11:07:00"),
                update: `Nelson commented "Generated chart service. Added supporting logic required for reusable chart components."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 88,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add donut-chart component, with input logic",
        description: `Create reusable donut-chart component with input logic.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 13, 2022 11:10:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 13, 2022 11:12:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 13, 2022 16:47:00"),
                update: `Nelson commented "Generated donut-chart component. Implemented input property logic, setup SVG with angle calculations."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 89,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add feature for chart element selection to displayed filtered tickets",
        description: `Create methods in chart-service to filter tickets stored in tracker service, for ticket-list to display.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 08:58:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 09:01:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 10:22:00"),
                update: `Nelson commented "Added output properties to chart components and required logic to project component, chart-service and tracker service to filter and display tickets based on chart element selections."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 90,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Set highest count donut-chart element to be 'in-focus' by default",
        description: `Set the donut-chart element with the highest count to be shown 'in-focus' by default.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 10:35:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 10:37:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 11:01:00"),
                update: `Nelson commented "Set the default 'in-focus' donut chart element to be one with the highest count."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 91,
        priority: "High",
        type: "Issue",
        project: "issueTracker.app",
        title: "Fix chart service percentage rounding",
        description: `Fix chart service percentage rounding to ensure donut-chart angle is accurately calculated.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 11:48:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 11:50:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 12:16:00"),
                update: `Nelson commented "Removed the chart-service logic used to round (toFixed() method). Used the number pipe in the template to round the percentages display in bar-chart component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 92,
        priority: "High",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add sort feature to ticket-list component",
        description: `Add feature to be able to sort tickets by property values, in both ascending and descending order.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 13:33:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 13:35:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 14:12:00"),
                update: `Nelson commented "Added functionality to sort tickets based on property values in descending order on column."<br>`
            },
            {
                date: new Date("July 14, 2022 14:31:00"),
                update: `Nelson commented "Added functionality to sort tickets based on property values in ascending order on column double click."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 93,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add SVG sort icon with status to ticket-list component",
        description: `Add SVG sort icon, to ticket-list component, with status indicated by dynamic fill attribute colors.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 14:48:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 14:50:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 15:25:00"),
                update: `Nelson commented "SVG sort icon with dynamic fill attribute color added to ticket-list component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 94,
        priority: "High",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add assignees component",
        description: `Add component to display list of assignees, with viewable assigned tickets.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 15:38:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 15:41:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 16:07:00"),
                update: `Nelson commented "Generated assignees component. Added looped assignee elements with details to template."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 95,
        priority: "High",
        type: "Issue",
        project: "issueTracker.app",
        title: "Fix navigation logic",
        description: `Fix navigation logic, including sub-menu item views.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 16:10:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 16:12:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 16:27:00"),
                update: `Nelson commented "Updated navigation logic used to control views within app."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 96,
        priority: "High",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add generated changelog to processed ticket-form and ticket-detail submissions",
        description: `Add generate changelogs to processed initial ticket-form and updated ticket-detail form submissions.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 14, 2022 16:31:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 16:33:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 17:06:00"),
                update: `Nelson commented "Add functionality to ticket submission handler methods, to generate changelog entries as required."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 97,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Style ticket-list component",
        description: `Style ticket-list component and contained table inline with app design theme.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 09:15:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 14, 2022 09:17:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 14, 2022 10:09:00"),
                update: `Nelson commented "Styled ticket-list component and contained table inline with project application design theme."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 98,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Style ticket-details component",
        description: `Style ticket-details component and contained form inline with app design theme.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 10:13:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 15, 2022 10:15:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 15, 2022 10:51:00"),
                update: `Nelson commented "Styled ticket-details component and contained form inline with project application design theme."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 99,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Style ticket-form component",
        description: `Style ticket-form component and contained form inline with app design theme.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 10:55:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 15, 2022 10:58:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 15, 2022 11:21:00"),
                update: `Nelson commented "Styled ticket-form component and contained form inline with project application design theme."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 100,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Style assignees component",
        description: `Style assignees component and contained elements inline with app design theme.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 11:24:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 15, 2022 11:26:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 15, 2022 11:48:00"),
                update: `Nelson commented "Styled assignees component and contained elements inline with project application design theme."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 101,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Style bar-chart component",
        description: `Style bar-chart component and contained chart elements inline with app design theme.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 11:53:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 15, 2022 11:56:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 15, 2022 12:22:00"),
                update: `Nelson commented "Styled bar-chart component and contained chart elements inline with project application design theme."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 102,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Style donut-chart component",
        description: `Style donut-chart component and contained chart element segments inline with app design theme.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 12:27:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 15, 2022 13:34:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 15, 2022 13:45:00"),
                update: `Nelson commented "Styled donut-chart component and contained chart element segments inline with project application design theme."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 103,
        priority: "Low",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add feature to highlight ticket in ticket-list component",
        description: `Add feature for user to be able to highlight ticket on table-row click within ticket-list component.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 13:53:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 15, 2022 13:55:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 15, 2022 14:21:00"),
                update: `Nelson commented "Added functionality to highlight ticket table-row on click, within ticket-list component."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },
    {
        number: 104,
        priority: "Low",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add style to filter property in ticket-list table column",
        description: `Add style indiciator to target filter property table-header/column in ticket-list component.`,
        status: "Closed",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 15, 2022 14:47:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 15, 2022 14:50:00"),
                update: `Nelson updated Status from Open to Pending.`
            },
            {
                date: new Date("July 15, 2022 15:13:00"),
                update: `Nelson commented "Added style ngClass to target filter property table-header/column in ticket-list component, as required."<br>
                        Nelson updated Status from Pending to Closed.`
            },
        ],
        highlighted: false
    },

    // ACTIVE TICKETS


    {
        number: 105,
        priority: "High",
        type: "Feature",
        project: "this.app",
        title: "Add cursor style logic for when tabs are dragged",
        description: `Add cursor style logic to display either grab or move east-west cursor when tabs are being dragged within tab-headers component, and to display not-allow cursor style when dragged outside of tab-headers component.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 16, 2022 09:47:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 106,
        priority: "Medium",
        type: "Issue",
        project: "this.app",
        title: "Enable deselected tabs to open if dragged",
        description: `Change select tabs method from being called from click event to mousedown event.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 16, 2022 09:55:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 107,
        priority: "High",
        type: "Issue",
        project: "this.app",
        title: "Enable dragged tabs to move to last position, if tab-header container has overflow",
        description: `Enable tab drag events to capture drag to last position, if tab dragged over the split-screen icon.
        Currently tabs can only be dragged to last position if there is visible tab-header container space after last tab header,
        which is not visible if tab-headers overflow container width.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 16, 2022 09:58:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 108,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add resizable feature to control inner-window heights of UI sections",
        description: `Add resizable feature to control inner-window heights of tab-body/preview component vs panel(terminal) component.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 16, 2022 10:02:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 109,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add count of open tabs to activity sidebar explorer icon",
        description: `Add total count of open tabs ontop of activity sidebar explorer icon, resembling edited files indication in VS Code.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 16, 2022 10:07:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 110,
        priority: "Low",
        type: "Feature",
        project: "this.app",
        title: "Add search icon/feature to activity sidebar",
        description: `Add functional search icon/feature to activity sidebar.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 16, 2022 10:16:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 111,
        priority: "Medium",
        type: "Issue",
        project: "issueTracker.app",
        title: "Disable sort-icon click fill change when N/A",
        description: `Disable sort-icon fill change on clic, if all tickets listed have single shared value.`,
        status: "Pending",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 17, 2022 10:33:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 17, 2022 12:33:00"),
                update: `Nelson updated Status from Open to Pending.<br>
                        Nelson updated Priority from Low to Medium.`
            }
        ],
        highlighted: false
    },
    {
        number: 112,
        priority: "Low",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add search tickets feature",
        description: `Add searchbar with functionality to display listed tickets containing value matches with entered string`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 17, 2022 12:08:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 113,
        priority: "Low",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add suggested tickets feature to create ticket-form component",
        description: `Add feature to ticket-form component, whereby a sub-list of existing tickets with matching string values will be displayed, to prevent duplicated requests.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 17, 2022 12:13:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 114,
        priority: "Low",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add 'My Projects' menu item",
        description: `Add 'My Projects' menu item, to show clickable chart(s) of filtered tickets by all projects DemoUser has raised tickets for.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 17, 2022 12:17:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 115,
        priority: "Low",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add transition animations for component/view changes",
        description: `Add subtle animations to view changes, within components are general view changes.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 17, 2022 12:22:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 116,
        priority: "Medium",
        type: "Issue",
        project: "issueTracker.app",
        title: "Replace SVG menu icons for 'Create Ticket' and 'My Tickets'",
        description: `Replace SVG menu icons for 'Create Ticket' and 'My Tickets' to simpler vectors with less lines/paths.`,
        status: "Pending",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 17, 2022 12:26:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 17, 2022 12:33:00"),
                update: `Nelson updated Status from Open to Pending.<br>
                        Nelson updated Priority from Low to Medium.`
            }
        ],
        highlighted: false
    },
    {
        number: 117,
        priority: "Medium",
        type: "Feature",
        project: "issueTracker.app",
        title: "Add bar + donut charts to assignee ticket-list views",
        description: `Add bar + donut charts to assignee ticket-list views, to enable ticket filtering beyond status.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 17, 2022 12:30:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 118,
        priority: "Medium",
        type: "Issue",
        project: "sciCalculator.app",
        title: "Revise displayed results for calculations > 10 digits",
        description: `Revise displayed results for calculations greater than ten digits - update current logic used to set *10 to the power of n:
        from only dividing by ten whilst initial calculation exceeds ten digits,
        to include a condition to continue this division whilst the last digit is zero.
        This would, for example, cause the result shown for one million squared to become '1 *(10^12)'.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 18, 2022 08:51:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 119,
        priority: "Low",
        type: "Feature",
        project: "sciCalculator.app",
        title: "Add functionality to disabled buttons",
        description: `Add functionality to all currently disabled buttons.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 18, 2022 08:56:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 120,
        priority: "Low",
        type: "Issue",
        project: "sciCalculator.app",
        title: "Add functionality to disabled buttons",
        description: `Replace displayed calculator body, currently comprised of div elements, with a single SVG.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 18, 2022 09:02:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 121,
        priority: "Low",
        type: "Feature",
        project: "localWeather.app",
        title: "Add city search feature",
        description: `Add feature to enable user to search for a given city's weather forecast.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 18, 2022 09:11:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 122,
        priority: "Low",
        type: "Feature",
        project: "localWeather.app",
        title: "Add universal background gif images",
        description: `Add universal background gif images to be used for other cities, following city search feature implementation.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 18, 2022 09:15:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 123,
        priority: "Low",
        type: "Issue",
        project: "localWeather.app",
        title: "Style revision - update weather container size to fill max space",
        description: `Style revision - update weather container size to fill max available preview section space, accepting preview width as an input.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 18, 2022 09:19:00"),
                update: "Nelson opened ticket."
            }
        ],
        highlighted: false
    },
    {
        number: 124,
        priority: "High",
        type: "Issue",
        project: "issueTracker.app",
        title: "Fix donut-chart svg circle rendering issue on Safari",
        description: `Fix svg circle rendering issue on Safari web browser.`,
        status: "Open",
        assignee: "Nelson",
        submitter: "Nelson",
        log: [
            {
                date: new Date("July 20, 2022 19:32:00"),
                update: "Nelson opened ticket."
            },
            {
                date: new Date("July 20, 2022 19:44:00"),
                update: `Nelson updated Status from Open to Pending.<br>
                        Nelson commented "Looking into this. Initial investigation suggests issue is possibly linked to a bug with transform attribute values."`
            }
        ],
        highlighted: false
    },
] 