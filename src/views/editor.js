import React, { Component } from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
class editor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});
  }
  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  toggleInlineStyle= (inlineStyle) => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle))
  }
  onTab = (e) => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  render() {
    const { editorState } = this.state;
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <div className="RichEditor-root">
        <BolckStyleControls onToggle={this.toggleBlockType}  editorState={editorState}></BolckStyleControls>
        <InlineStyleControls onToggle={this.toggleInlineStyle} editorState={editorState}></InlineStyleControls>
        <div className={className} onClick={this.focus}>
          <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={this.state.editorState}
          placeholder="Tell a story..."
          handleKeyCommand={this.handleKeyCommand}
          ref="editor"
          onChange={this.onChange}
          onTab={this.onTab}
          spellCheck
          ></Editor>
        </div>
      </div>
    )
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
// 编辑按钮
class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    }
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return(
      <span className={className} onMouseDown={this.onToggle} style={this.props.styleSelf}>
        {this.props.label}
      </span>
    )
  }
}
const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one', styleSelf: {'fontSize': '22px'}},
  { label: 'H2', style: 'header-two', styleSelf: {'fontSize': '20px'}},
  { label: 'H3', style: 'header-three', styleSelf: {'fontSize': '18px'}},
  { label: 'H4', style: 'header-four', styleSelf: {'fontSize': '16px'}},
  { label: 'H5', style: 'header-five', styleSelf: {'fontSize': '14px'} },
  { label: 'H6', style: 'header-six', styleSelf: {'fontSize': '12px'} },
  { label: 'Blockquote', style: 'blockquote', styleSelf: {} },
  { label: 'UL', style: 'unordered-list-item', styleSelf:{}},
  { label: 'OL', style: 'ordered-list-item', styleSelf: {}},
  { label: 'Code Block', style: 'code-block', styleSelf: {}},
]
const BolckStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  return (
    <div className="RichEditor-controls">
      {
        BLOCK_TYPES.map((item,index) => (
          <StyleButton
            key={item.label}
            active={item.style === blockType}
            label={item.label}
            style={item.style}
            onToggle={props.onToggle}
            styleSelf={item.styleSelf}
          >
          </StyleButton>
        ))
      }
    </div>
  )
}
const INLINE_STYLES = [
  { label: 'Bold',      style: 'BOLD', styleSelf: {'fontWeight': 'bold'}},
  { label: 'Italic',    style: 'ITALIC', styleSelf: {'fontStyle': 'italic'}},
  { label: 'Underline', style: 'UNDERLINE', styleSelf: {'textDecoration': 'underline'} },
  { label: 'Monospace', style: 'CODE', styleSelf: {}}
]
const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        (<StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          styleSelf={type.styleSelf}
        />))}
    </div>
  );
};
export default editor;