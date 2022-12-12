export interface CalcButton {
    name: string;
    label: string;
    enabled: boolean;
    alt: boolean; // used to determine whether button has alternative style - e.g. 'DEL' && 'AC'
}