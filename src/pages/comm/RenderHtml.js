import React, {PureComponent} from 'react';
import Html from 'react-native-render-html';
import ImageMark from '../../components/ImageMark'
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';

let img = (props) => {
    if (!props.src) {
        return false;
    }

    return <ImageMark
        key={props.src}
        src={props.src}/>

}

export default class RenderHtml extends PureComponent {

    render() {
        const {html} = this.props;
        return <Html
            debug={true}
            onLinkPress={(event, href, attribs) => {
                console.log('链接', href)
                router.toWebViewPage(attribs, href)

            }}
            ignoredTags={[...IGNORED_TAGS, 'br']}
            renderers={{img}}
            html={html}/>
    }


}