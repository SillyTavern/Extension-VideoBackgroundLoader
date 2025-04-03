export { };

// 1. Import when extension is user-scoped
import '../../../../public/global';
// 2. Import when extension is server-scoped
import '../../../../global';

declare global {
    interface ConvertVideoArgs {
        buffer: Uint8Array;
        name: string;
    }

    function convertVideoToAnimatedWebp(args: ConvertVideoArgs): Promise<Uint8Array>;
}
