import { Component } from "react"
class GoogleAds extends Component {

    componentDidMount() {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    render() {
        return (<>
                {/* ad unit 1 */}
					<ins class="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-2416283273352263"
                    data-ad-slot={this.props.slot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
        </>);
    }
}

export default GoogleAds;
