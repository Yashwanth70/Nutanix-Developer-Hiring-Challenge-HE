import React,{Component} from 'react'
import {inject,observer} from 'mobx-react'
import {Link,Route} from 'react-router-dom';
import '../css/searchResults.css'
import SearchTags from './SearchTags'
import RepoList from './RepoList'
import SelectMenu from './SelectMenu'
import Loader from '../Loader'
import Pagination from './Pagination'
@inject(stores => ({
	searchTerm:stores.search.searchTerm,
	response:stores.search.response,
	isLoading:stores.search.isLoading,
	type:stores.search.type,
	alterFetch:() => {
		stores.search.alterFetch()
	},
	fetch:(searchTerm) => {
		stores.search.fetch(searchTerm);

	},
	
}))


@observer
export default class SearchResults extends Component{
	
	async componentWillMount(){
		const {term} = this.props.match.params
		const {prev} = this.props.searchTerm
		if(!this.props.response.items || (term!==prev)){
		 
		 await this.props.fetch(term)

		}
	}
	render(){
		const {response} = this.props
		console.log(response)
		return(
			<div>
			<SearchTags />
			{(!this.props.isLoading)
				?
				<div className="container2">
					<div className="partition">
						<div className="three-fourth">

							<div className="topper">
							<h3 className="topperHeading">{response.total_count} {this.props.type.toUpperCase()} Results</h3>
							<SelectMenu id="top"/>
						    </div>

						   <RepoList />
						   <Pagination />

					</div>
					<div className="one-fourth">
							<div className="lang-header">
								<h2>Languages</h2>
								<ul className="filter-list">
									<li><Link to={`/repo/Python`} className="noUnderline">
										<a>Python</a><span className="rightSide">550982</span></Link>
									</li>
									<li><Link to={`/repo/Java`} className="noUnderline">
										<a>Java</a><span className="rightSide">631895</span></Link>
									</li>
									<li><Link to={`/repo/JavaScript`} className="noUnderline">
										<a>JavaScript</a><span className="rightSide">313956</span></Link>
									</li>
									<li><Link to={`/repo/C`} className="noUnderline">
										<a>C</a><span className="rightSide">4010442</span></Link>
									</li>
									<li><Link to={`/repo/C++`} className="noUnderline">
										<a>C++</a><span className="rightSide">4429576</span></Link>
									</li>
									<li><Link to={`/repo/Go`} className="noUnderline">
										<a>Go</a><span className="rightSide">371197</span></Link>
									</li>
									<li><Link to={`/repo/Ruby`} className="noUnderline">
										<a>Ruby</a><span className="rightSide">242770</span></Link>
									</li>
									<li><Link to={`/repo/PHP`} className="noUnderline">
										<a>PHP</a><span className="rightSide">322385</span></Link>
									</li>
									<li><Link to={`/repo/HTML`} className="noUnderline">
										<a>HTML</a><span className="rightSide">266663</span></Link>
									</li>
									<li><Link to={`/repo/C#`} className="noUnderline">
										<a>C#</a><span className="rightSide">4197795</span></Link>
									</li>
								</ul>

							</div>
						</div>
				</div>
			</div>
			:
			<Loader />}
			
		</div>
			)
		
	}
}