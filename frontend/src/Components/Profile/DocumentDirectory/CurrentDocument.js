function CurrentDocument({ props }){
    const title = props.document.title;
    const content = props.document.content;
    
    return(
        <div id="currDocument">
            <h2>{title}</h2>
            <pre>{content}</pre>
        </div>
    );
}

export default CurrentDocument;