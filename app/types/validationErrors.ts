export interface ValidationErrors {
    message: string;
    errors: {
        [key: string]: string[];
    };
}