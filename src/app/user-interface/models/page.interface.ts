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