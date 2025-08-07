export interface SupportedFileType {
  label: string;
  description: string;
  fileExtensions: string[];
}

export interface TemplateData {
  currentDate: string;
  currentTime: string;
}

export interface LanguageMapping {
  [key: string]: string;
}
