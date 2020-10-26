import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
function myBlockRenderer(contentBlock) {
    const type = contentBlock.getType();

    // Convert image type to mediaComponent
    if (type === 'atomic') {
      return {
        component: MediaComponent,
        editable: false,
        props: {
          foo: 'bar',
        },
      };
    }
  }

  class MediaComponent extends React.Component {
    render() {
      const { block, contentState } = this.props;
    //   const { foo } = this.props.blockProps;
      const data = contentState.getEntity(block.getEntityAt(0)).getData();
      const emptyHtml = ' ';
      return (
        <div>
          {emptyHtml}
          <img
            src={data.src}
            alt={data.alt || ''}
            style={{height: data.height || 'auto', width: data.width || 'auto'}}
          />
        </div>
      );
    }
  }


export default class ArticlEditor extends Component {
    state ={
        editorState:"",
        contentState:""
    }

    componentDidMount() {
        console.log("ArticlEditor-创建",this.props.content)
        if(this.props.content===undefined) return ;
        const contentBlock = htmlToDraft(this.props.content);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({
                editorState
            })
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps){
    //     console.log("ArticlEditor-更新",nextProps.content)

    //     // html===>draftjs
    // }
    

    render() {
        return (
                <Editor
                    localization={{ locale:'zh' }}
                    editorState={this.state.editorState}
                    toolbarClassName="aaaaa"
                    wrapperClassName="bbbbbbbbb"
                    editorClassName="ccc"
                    onEditorStateChange={this.onEditorStateChange}

                    onContentStateChange={this.onContentStateChange}

                    onBlur = {this.handleBlur}

                    blockRendererFn={myBlockRenderer} 
                />
        )
    }

    onEditorStateChange = (editorState)=>{
        // console.log(editorState)
        this.setState({
            editorState:editorState
        })
    }

    onContentStateChange = (contentState)=>{
        this.setState({
            contentState
        })
        // console.log(draftToHtml(contentState))
    }

    handleBlur = ()=>{
        this.props.getContent( draftToHtml(this.state.contentState) )
        // console.log(draftToHtml(this.state.contentState))
    }
}
