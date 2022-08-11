export interface Page {
    id: number;
    folder: boolean;
    folderClosed: boolean;
    name: string;
    filepath: string;
    content: string;
    contentLineCount: number;
    contentFormatted: boolean;
    subPages: Page[];
    iconClass: string;
    selected: boolean;
    parentFolderId: number;
    hasPreviewOptions: boolean;
    previewOptions: string[];
    previewComponents: any;
    previewToggle: string;
    previewContent: string;
    draggedOver: boolean;
    color: string;
}
// interface implemented below and by services for references of object instances

export const Pages = [
    {
        id: 1,
        folder: false,
        folderClosed: false,
        name: 'about',
        filepath: 'about',
        content: `I'm a Front-End/Web Developer from London,
                currently working as a Technical Consultant,
                with extensive experience providing support for Management Systems,
                within the Engineering/Technology Division of a multinational investment company.\\
                My programming journey initially began in 2015 /* excluding early experiments adjusting the HTML and CSS of my MySpace page back in 2008 */,
                with a brief introduction to Java 8,
                and resumed in 2019 with a renewed focus to transition into development full-time.
                Following suggestions from a few Senior Engineers,
                I undertook a course offered by Microsoft on Logic and Computational Thinking.
                After completing this preliminary course, I chose to proceed in the opposite direction of recommendations to proceed with Python first,
                by commencing an Introduction to Computer Science course using C.
                /* My thinking behind this was that building a foundation with Python first would be analogous to learning to drive a car automatically, whereas developing with a lower-level programming language would be akin to learning to drive manually */\\
                Midway through this introductory course, a few of the low-level concepts seemed a little too advanced to continue with,
                therefore I chose to switch to a more suitable course on <a href="https://www.edx.org/course/software-development-fundamentals" target="_blank" title="Opens in new browser tab">Software Development Fundamentals</a> offered by University of Pennsylvania,
                which provided a thorough overview of Object Oriented Programming with Java.
                Following on from this,
                I completed the subsequent course on <a href="https://www.edx.org/course/data-structures-and-software-design" target="_blank" title="Opens in new browser tab">Data Structures and Software Design</a>,
                and a final course on <a href="https://www.edx.org/course/programming-for-the-web-with-javascript" target="_blank" title="Opens in new browser tab">Programming for the Web with JavaScript</a>,
                before eventually receiving a recommendation to check out the Angular Tour of Heroes tutorial,
                and I've been enjoying diving deeper with Angular 13 almost everyday since!\\    
                A little about me personally, I'm a fan of football and outdoor activities,
                reading non-fiction, learning and experiencing new things,
                socialising and listening to various genres of music.\\    
                Interested in continued progression with front-end development,
                with a desire to also gain back-end experience developing microservices,
                alongside working on challenging projects with positive people!\\\\
                `,
        subPages: [],
        iconClass: 'fa fa-user-o',
        selected: false,
        contentLineCount: 0,
        contentFormatted: false,
        parentFolderId: 0,
        hasPreviewOptions: false,
        previewOptions: ['', ''],
        previewComponents: ['about'],
        previewToggle: '0',
        previewContent: '',
        draggedOver: false,
        color: "#cccccc"
    },
    {
        id: 2,
        folder: false,
        folderClosed: false,
        name: 'skills',
        filepath: 'skills',
        content: ` To paraphrase a song lyric I like to live by;
                    If I can't learn it, then it can't be learnt. \\
                /* CORE TECH SKILLS */\\
                Angular 13 {
                    features: [Components,
                        Services/Dependency Injections,
                        Directives, Behaviour Subjects/Observables,
                        Binding, Pipes, View Encapsulation,
                        Routing/Location State,
                        HTTP Client,
                        HostListener];}
                TypeScript / JavaScript {
                    features: [JSON, 
                        Arrays, 
                        Loops, 
                        Conditions, 
                        Interfaces, 
                        Object Encapsulation, 
                        setTimeout, 
                        toString, 
                        parseInt/Float, 
                        scrollIntoView];}
                HTML5 / CSS3 {
                    features: [Flex, 
                        Grid, 
                        Custom Fonts, 
                        SVGs, 
                        Animations, 
                        Keyframes, 
                        Transforms, 
                        Transitions, 
                        Draggable Elements, 
                        Media Queries, 
                        Z-Index];}
                \\/* OTHER TECHNICAL FAMILIARITIES / SKILLS –\\
                ** Java (basic knowledge)\\
                ** C# (basic knowledge)\\
                ** Github (basic knowledge)\\
                ** Adobe Illustrator / Photoshop (basic knowledge)\\
                ** Microsoft Office Suite + Visio\\
                ** Google Search (extensive daily usage) \\*/\\
                \\/* NON-TECHNICAL / SOFT SKILLS –\\
                ** Communication: comfortable interacting with all levels of awareness and seniority\\
                ** Collaboration: always open-minded and eager to learn from other people's perspectives\\
                ** Creativity: enjoy thinking outside of the box to overcome challenging obstacles\\
                ** Teamwork: happy helping teammates with any issues and not afraid to ask for help if needed\\
                */
                `,
        subPages: [],
        iconClass: 'fa fa-hand-spock-o',
        selected: false,
        contentLineCount: 0,
        contentFormatted: false,
        parentFolderId: 0,
        hasPreviewOptions: false,
        previewOptions: ['', ''],
        previewComponents: ['skills'],
        previewToggle: '0',
        previewContent: '',
        draggedOver: false,
        color: "#BEA47F"
    },
    {
        id: 3,
        folder: true,
        folderClosed: false,
        name: 'projects',
        filepath: 'projects',
        content: '',
        iconClass: 'fa fa-folder',
        selected: false,
        contentLineCount: 0,
        contentFormatted: false,
        parentFolderId: 0,
        hasPreviewOptions: false,
        previewOptions: ['', ''],
        previewComponents: [''],
        previewToggle: '',
        previewContent: '',
        draggedOver: false,
        color: "#BEA47F",
        subPages: [
            {
                id: 6,
                folder: false,
                folderClosed: false,
                name: 'this.app',
                filepath: 'this.app',
                content: `/* OBJECTIVE */\\
                        For this project, my overall objectives were to develop;
                        firstly, a deeper understanding of using Angular to create Single-Page Applications,
                        && secondly, a portfolio website to host all current && future projects.
                        Therefore, I decided to build this app in the style of a code editor's UI, with an integrated preview section.\\
                        <a href="https://github.com/nprod21/nprod21.github.io" target="_blank" title="Opens in new browser tab">Source code can be accessed here <i class=\"fa fa-external-link\"></i></a>.
                        \\/* FEATURES */\\
                        TabHeaders Component {
                            summary: displays open tabs + controls tab reselection/closure;
                            highlights: [selected tab scrollIntoView, draggable];}
                        Panel Component {
                            summary: displays simulated terminal log entries;
                            highlights: [auto updates log entries of generalised app lifecycle events per user-navigation, latest entries scrollIntoView];}
                        SplashScreen Component {
                            summary: displays a temporary animated SVG view for each preview component load;
                            highlights: [auto destroys after preset duration, awaitings API response before setTimeout];}
                        UI Component {
                            summary: contains all app components;
                            highlight: centered handle enables freely resizable text/preview section widths;}
                        Tab Service {
                            summary: shares data + logic (related to all pages) with most app components;
                            highlights: [handles menu page to tab fruition, tab selection/rearrangement/closure, formats string of each page's content into styled HTML to imitate code structure];}
                        Terminal Service {
                            summary: creates + shares terminal log entry data with Panel component;
                            highlights: [asynchronous sharing via Behaviour Subjects + Observables, bypasses delayed entries relating to Splash Screen actions if navigation received from Route Service];}
                        Route Service {
                            summary: enables open tab state management via URL interaction;
                            highlight: sets URL path with appended string of ordered open tab IDs;}
                        \\/* TODOs\\
                        * Add lower handle to enable freely resizable heights between lower panel && middle sections\\
                        * Change logic for reselecting tab headers (from click to mousedown event) such that deselected tabs open if dragged\\
                        * Revise logic for tab text scroll position restoration to improve consistency when reselecting tabs\\
                        * Refactor TabPreview Component to utilise router link for preview component selection
                        * General refactoring of app codebase\\
                        * Set cursor styling for when tabs are dragged\\
                        * Activity/Sidebar enhancement - add open-tab count to side activity bar explorer icon + add search icon && functionality\\
                        * For further details of TODOs for this project - please view my issueTracker.app project!\\
                        */
                        `,
                subPages: [],
                iconClass: 'fa fa-asterisk',
                selected: false,
                contentLineCount: 0,
                contentFormatted: false,
                parentFolderId: 3,
                hasPreviewOptions: false,
                previewOptions: ['Demo'],
                previewComponents: ['this-demo'],
                previewToggle: '0',
                previewContent: 'Demo or Live previewContent',
                draggedOver: false,
                color: "#BEA47F"
            },
            {
                id: 7,
                folder: false,
                folderClosed: false,
                name: 'localWeather.app',
                filepath: 'localWeather.app',
                content: `/* OBJECTIVE */\\
                        For this project, my primary objective, was to build an application centered around data consumed from a third-party RESTful API.
                        My secondary objective was to gain familiarity with CSS flex, to structure a simple layout.\\
                        <a href="https://github.com/nprod21/nprod21.github.io/tree/main/src/app/projects/project-weather" target="_blank" title="Opens in new browser tab">Source code can be accessed here <i class=\"fa fa-external-link\"></i></a>.
                        \\/* FEATURES */\\
                        dynamic animated background image {
                            highlight: image source property binding varies depending on current weather description and time of day;}
                        date pipe used to format and review data received {
                        highlight: new date variable instantiated to compare with sunset/sunrise data received, to determine time of day;}
                        dynamic text shadow {
                            highlight: color shade of grey or black used for text shadow, depending on time of day;}    
                        \\/* TODOs\\
                        * Add city search functionality\\
                        * Add non location-specific/universal background gif images for other cities\\
                        * Style demo simulation setter dropdowns && address positioning on responsive devices\\
                        * For further details of TODOs for this project - please view my issueTracker.app project!\\
                        */
                       `,
                subPages: [],
                iconClass: 'fa fa-cloud',
                selected: false,
                contentLineCount: 0,
                contentFormatted: false,
                parentFolderId: 3,
                hasPreviewOptions: false,
                previewOptions: ['weatherApp'],
                previewComponents: ['weather-project'],
                previewToggle: '110px',
                previewContent: 'Demo or Live previewContent',
                draggedOver: false,
                color: "#cccccc"
            },
            {
                id: 8,
                folder: false,
                folderClosed: false,
                name: 'sciCalculator.app',
                filepath: 'sciCalculator.app',
                content: `/* OBJECTIVE */\\
                        The initial purpose of this project was to simply gain further experience using CSS grid,
                        however, this app generated a great amount of exposure to numerous CSS && JavaScript features, required to enable the business logic.
                        /*\\
                        * note this emulation would have been tremendously difficult without referencing my 10+ year old physical model from school, * so thank you Casio for the longevity - please don't sue me! \\
                        */\\\\
                        <a href="https://github.com/nprod21/nprod21.github.io/tree/main/src/app/projects/project-calculator" target="_blank" title="Opens in new browser tab">Source code can be accessed here <i class=\"fa fa-external-link\"></i></a>.
                        \\/* FEATURES */\\
                        3D Design {
                            highlights: [raised edges + outer shadows on body && buttons, button edges && shadows adjust when active, arrow buttons perform 2D transforms when active, inner shadow on display screen && solar panel];}
                        Representational display screen {
                            highlights: [visible inactive LCD placeholders, far left/right arrows indicate character overflow, repositionable blinking cursor];}
                        Numeric && Arrow key press button control {
                            highlights: [active style ngClasses toggled by keydown/up events, corresponding numeric entries register in business logic, arrow right/left entries reposition cursor +/- 1 position, arrow up/down entries reposition cursor to start/end of equation];}
                        Nested equation calculations {
                            highlights: [methods retrieve preceding + succeeding arguments for advanced operations where required];
                            /* eg for squared/power of operations - multiple can be nested && each base argument is initially entered before these functions */\\}
                        Formatted results displayed for long calculated answers {
                            highlights: [initial calculations > 10 digits are repeatedly divided by 10 (until under 10 digits) && then displayed with a *10 to the power of n value,
                            initial calculations with signicant decimal places are rounded to display a result with the maximum spare decimal places after the whole number];}
                        \\/* TODOS\\
                        * Revise displayed result for calculations greater than 10 digits:\\
                        ** update current logic used to set *10 to the power of n:\\
                        *** from only dividing by ten whilst initial calculation exceeds 10 digits,
                        *** to include a condition to continue this division whilst the last digit is zero\\
                        **** - this would cause the result shown for one million squared to become '1 *(10^12)'\\
                        *\\
                        * Add functionality to disabled buttons\\
                        * For further details of TODOs for this project - please view my issueTracker.app project!\\
                        */\\\\
                        `,
                subPages: [],
                iconClass: 'fa fa-calculator',
                selected: false,
                contentLineCount: 0,
                contentFormatted: false,
                parentFolderId: 3,
                hasPreviewOptions: false,
                previewOptions: ['sciCalc'],
                previewComponents: ['calculator-project'],
                previewToggle: '110px',
                previewContent: 'Demo or Live previewContent',
                draggedOver: false,
                color: "#cccccc"
            },
            {
                id: 9,
                folder: false,
                folderClosed: false,
                name: 'issueTracker.app',
                filepath: 'issueTracker.app',
                content: `/* OBJECTIVE */\\
                        The purpose of this project was to build a CRUD application, with reusable components heavily focused on data management and processing, alongside interactive presentation.\\
                        <a href="https://github.com/nprod21/nprod21.github.io/tree/main/src/app/projects/project-tracker" target="_blank" title="Opens in new browser tab">Source code can be accessed here <i class=\"fa fa-external-link\"></i></a>.
                        \\/* FEATURES */\\
                        Reusable chart components {
                                highlights: [bar + donut chart components dynamically represent data summaries per input properties, interactive chart elements (bars/segments) facilitate list data filtering];}
                        Reusable tabular data component {
                                highlights: [ticket-list component presents filtered data per input properties, table columns are sortable in both ascending + descending order];}
                        Data object management {
                                    highlights: [data objects (tickets) can be created and updated via ticket form submissions, form submissions feature input validation];}
                        Responsive design {
                                        highlights: [side navigation bar menu auto-collapses/expands per inputted preview width - with z-index switches to overlay app body on menu expansion under a defined width threshold, ticket-list component features flex display to fill available width space - with container overflow scrolling enabled];}           
                        \\/* TODOs\\
                        * Fix issues detailed within this application\\
                        * Implement features detailed within this application\\
                        */
                    `,
                subPages: [],
                iconClass: '',
                selected: false,
                contentLineCount: 0,
                contentFormatted: false,
                parentFolderId: 3,
                hasPreviewOptions: false,
                previewOptions: ['issueTracker'],
                previewComponents: ['tracker-project'],
                previewToggle: '110px',
                previewContent: 'Demo or Live previewContent',
                draggedOver: false,
                color: "#72c790"
            },
        ]
    },
    {
        id: 5,
        folder: false,
        folderClosed: false,
        name: 'contact',
        filepath: 'contact',
        content: `Connect with me on LinkedIn <i class=\"fa fa-linkedin-square\"></i> --->\\\\ 
                    ||\\\\
                    Send me an email <i class=\"fa fa-pencil-square-o\"></i> --->\\
                    /* <a href="mailto:nelson.daly@outlook.com" title="Direct email">nelson.daly@outlook.com</a> */
                    `,
        subPages: [],
        iconClass: 'fa fa-address-card',
        selected: false,
        contentLineCount: 0,
        contentFormatted: false,
        parentFolderId: 0,
        hasPreviewOptions: true,
        previewOptions: ['LinkedIn', 'Email'],
        previewComponents: ['contact-linkedin', 'contact-email'],
        previewToggle: '0',
        previewContent: "<app-main-window></app-main-window>",
        draggedOver: false,
        color: "#cccccc"
    }
];
