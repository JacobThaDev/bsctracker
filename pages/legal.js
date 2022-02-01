import { Card, Col, Row, Container } from "react-bootstrap";

import PageHead from "../components/global/head";
import PageNav from "../components/global/navigation";
import Footer from "../components/global/footer";
import SmallHeader from "../components/global/small_header";

export default function Legal() {

    return(
        <>
            <PageHead title="SafeMoon"/>
            <PageNav/>

            <SmallHeader title="Terms of Service" subtext="The legal stuff"/>
        

            <Container style={{paddingTop: 100, paddingBottom: 100}}>
                <Row className="align-items-center">
                    <Col xs={12} lg={12} className="mb-4 mb-lg-0">

                        <h3 className="fw-bold">Terms of Service</h3>
                        <p>
                            By using this website, and any of it's sub-domains, you agree to the following 
                            terms and conditions. Please note, that different terms and conditions may 
                            apply depending on the service in use, and you must be at least 18 years of age 
                            to use this service due to regulations on cryptocurrency.
                        </p>

                        <p className="fw-bold">
                            Use of Data / Data Collection
                        </p>
                        <p>
                            When using our services, we may collect data from your computer or device, 
                            including information about your computer or device and operating system 
                            (such as IP Address), system interactions, and hardware. We do not store 
                            this data, and we do not share this data with anyone. We use this information 
                            to provide you with the best possible experience on your platform, improve 
                            our products and services, and trouble shoot bugs. (mostly the latter).
                        </p>

                        <p className="fw-bold">
                            Changes to this agreement
                        </p>
                        <p>
                            We may modify this Agreement from time to time, so please review it frequently. 
                            For users who have accepted a version of this Agreement prior to modification, 
                            the revisions will become effective 30 days after posting at bsctracker.net/terms. 
                            Your continued use of our services means you accept the changes. 
                            Once you accept a version of the Agreement, we will not enforce future material 
                            changes without your express agreement to them. If you are asked to accept material
                            changes to this Agreement and you decline to do so, you may not be able to continue
                            to use the RN Service provided.
                        </p>

                        <hr/>

                        <h3 className="fw-bold" id="privacy">
                            Privacy Policy
                        </h3>

                        <p>
                            We are committed to integrity and professionalism in all areas of our services 
                            and therefore we take our obligations under the Data Protection Act 1998 
                            (“the Act”) seriously. We will use all reasonable endeavours to protect your 
                            privacy and ensure that personal data is collected and processed in accordance 
                            with the Act and only as outlined below.
                        </p>

                        <p className="fw-bold">Your personal Data; What we collect.</p>
                        <p>
                            We do not collect any information from you. We may use cookies, which are stored
                            on the drive of your computer. Cookies contain information that is transferred to 
                            your computer's hard drive and allow us to recognise your PC and your preferred 
                            settings. Most browsers can be programmed to reject, or warn you, 
                            before using cookies.
                        </p>

                        <p>
                            No personal data from your cookies on BscTracker.net are stored on any server, 
                            and can/will not be shared.
                        </p>

                        <p className="fw-bold">Data Security</p>
                        <p>
                            We will take reasonable steps to protect the personal data under our control from 
                            unauthorised access, improper use and disclosure. Even though we have taken 
                            reasonable steps to protect your data whilst it is being transmitted, we cannot 
                            guarantee the security of any data transmitted to us by the internet and any 
                            transmission is at your own risk. Once we have received your data, we will use 
                            strict procedures and security features to prevent unauthorised access.
                        </p>

                        <p>
                            If you have any enquiry or concern about our Privacy Policy, or the way we are 
                            handling your personal data, please contact us at <a href="mailto:rune.evo2012@gmail.com">rune.evo2012@gmail.com</a>
                        </p>

                        <hr/>

                        <h3 className="fw-bold" id="disclaimer">
                            Disclaimer
                        </h3>
                        <p>
                            We are not affiliated with any of the tokens listed on this website, or any external 
                            service that we use. All logos are copyright their respective companie(s) and do not
                            belong to us. This website and all of it's services is not meant for financial 
                            advice, and will never provide such information.&nbsp;
                            <span className="fw-bold text-danger">This website is built for informative purposes only.</span>
                        </p>

                        <p>All prices and values you see are an approximation and may or may not be accurate. </p>

                        <p>
                            If there is an issue with using your logo, please contact me 
                            <a href="mailto:rune.evo2012@gmail.com"> rune.evo2012@gmail.com</a>.
                        </p>
                    </Col>
                </Row>
            </Container>

            <Footer/>
        </>
    )
}