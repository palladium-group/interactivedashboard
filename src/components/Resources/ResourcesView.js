import React, {Component} from 'react'
import './resources.css'
import Button from '@material-ui/core/Button';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { getInstance } from 'd2';

class ResourcesView extends Component {
    constructor(props) {
        super(props);
        this.state={
            fileResources:null,
            api:null
        }
    }

    componentWillMount(){
        this.fetchFiles()
    }

    fetchFiles=()=>{
        getInstance()
            .then(d2 => {
                const api = d2.Api.getApi() // Returns the Api singleton.
                api.get('/documents.json?fields=displayName,href,id,url,external,contentType,attachment&paging=false').then(results=>{
                    console.log()
                    this.setState({
                        fileResources:results,
                        api:api
                    })
                }).catch(error => console.log('error', error));

            });
    }


    render() {
       if(this.state.fileResources!=null) return (
           <div className="resource-page">
               <div className="resource-holder">
                   {this.state.fileResources.documents.map(file=>{
                       let docType=file.contentType!=undefined?file.contentType:"docx";
                       let defaultStyle=docType.includes('image')?defaultStyles.jpg:defaultStyles.docx
                       return(
                           <div key={file.id}>
                               <div className="resource-header">
                                   {file.displayName}
                               </div>
                               <div className="resource-body">
                                   <div className="resource-icon-holder">
                                       <div className="resource-icon">
                                           <FileIcon {...defaultStyle}/>;
                                       </div>

                                   </div>
                               </div>
                               <div >
                                   <a href={`${file.href}/data`}  target="_blank">
                                       <Button variant="outlined" className="resource-view-button">
                                           <text className="resource-button-text">
                                               View File
                                           </text>
                                       </Button>
                                   </a>

                               </div>
                           </div>
                       )
                   })}
               </div>
           </div>

        )
        if(this.state.fileResources==null) return (<div> Loading</div>)
    }
}
export default ResourcesView
