export default function SvgIcon({ className, icon, size, stroke = 1 }) {

    try {
        // loading it from dist folder so we don't have to manually define
        // the icons. Also saves us from having to add overhead importing the lib.
        let Icon = require('react-feather/dist/icons/'+icon).default;

        return (
            <Icon 
                stroke="currentColor"
                className={className}
                width={size}
                height={size}
                strokeWidth={stroke} />
        )
    } catch (err) {
        return null;
    }

}