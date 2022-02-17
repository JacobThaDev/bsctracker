
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

import * as ProDuotone from '@fortawesome/pro-duotone-svg-icons';
import * as ProSolid from '@fortawesome/pro-solid-svg-icons';
import * as ProLight from '@fortawesome/pro-light-svg-icons';
import * as ProRegular from '@fortawesome/pro-regular-svg-icons';
import * as Brands from '@fortawesome/free-brands-svg-icons';

library.add(
    ProLight.faArrowUpRightFromSquare,
    ProLight.faChartBar,
    ProLight.faTimes,
    ProLight.faSearch,
    ProLight.faEnvelope,
    ProLight.faEnvelopeDot,
    ProLight.faChartLine,
    ProLight.faArrowRight,
    ProLight.faCoffee,
    ProLight.faSync,
    ProLight.faUsd,
    ProLight.faHandHoldingDollar,
    ProLight.faUniversity,
    ProLight.faFire,
    ProLight.faCopy,
    ProLight.faCheck,
    ProLight.faDoorOpen,
    ProDuotone.faDoorOpen,
    ProSolid.faRocketLaunch,
    
    ProSolid.faHeart,
    ProSolid.faSpinner,
    ProSolid.faArrowUp,
    ProSolid.faChevronDown,
    ProSolid.faChevronUp,
    ProSolid.faArrowDown,
    ProSolid.faBars,
    ProSolid.faSunAlt,
    ProSolid.faMoon,

    ProDuotone.faChartBar,
    ProDuotone.faSpinner,
    ProDuotone.faWallet,
    ProDuotone.faFire,
    ProDuotone.faAnalytics,
    ProDuotone.faCoffee,
    ProDuotone.faRocketLaunch,

    Brands.faDiscord,
    Brands.faGithub,
    Brands.faTwitter,
    Brands.faLinkedin,

    ProRegular.faExclamationTriangle
);

export default function FontIcon({
    className,
    pulse = false,
    size = "sm",
    ...props
}) {

    return(
        <FontAwesomeIcon 
            className={className}
            fixedWidth={true}
            icon={[props.type, props.icon]} pulse={pulse} size={size}
        />)
}