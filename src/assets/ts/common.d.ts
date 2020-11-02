

declare let jQuery: (selector?: string) => any;
declare let $: (selector?: string) => any;

declare interface AxiosRequestConfig {
    get(arg: string);
    then();
    catch();
}
declare let axios:AxiosRequestConfig;

interface VueArg{
    el: string;
    data?: {
        [propName: string]: any
    };
    methods?: {
        [propName: string]: any
    };
    mounted?: ()=>any;
};

declare class Vue{
    constructor(arg: VueArg);
};

declare class Swiper{
    slidePrev();
    slideNext();
    constructor(
        selector: string, 
        arg ?: {[propName: string]: any}
    )
};