import React from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../store/actions'
import Story from '../component/Story';
import Loader from '../component/Loader';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data:[],
            searchData: []
        }
    }

    componentDidMount() {
        this.props.fetchStories();
    }
    componentDidUpdate(prevProps){
        const stories = this.props.stories;
        if(stories!==prevProps.stories){
            this.setState({data : stories});
        }
    }
    renderData = () => {
        const { data } = this.state;
        let renderData;
        if (data && data.length) {
            renderData = data.map((story) =>
                <Story story={story} />
            );
        } else {
            renderData = <div>data is not found</div>
        }
        return renderData;
    }

    fillterData = () => {
        const {query,data} = this.state;
        if(query){
        const responseData = data.filter(element => {
            if(element?.title){
            return element.title.toLowerCase().includes(query.toLowerCase());
            }
            
        });
        this.setState({ searchData: responseData });
    } else{
        this.setState({ searchData: [] });
    }
    }
    handleSearch = (event) =>{
        this.setState( {query: event.target.value},() =>{
            setTimeout(() => {
                this.fillterData();
            }, 300);
        });
}

    renderSearchData = () => {
        console.log("renderSearchData = "+JSON.stringify(this.state.searchData));
        const { searchData } = this.state.searchData;
        let renderData;
        if(this.state.searchData && this.state.searchData.length){

            renderData = this.state.searchData.map((story) =>
                <div>
                <Story key={story}  story={story} />
                </div>
            );
        }
    
        return renderData;
    }
    clearSearch = () =>{
        this.setState({query: null, searchdata: []});
    }

    render() {
        const loading = this.props.loading;
        const {searchData,query} = this.state;
        return (
            <main>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                    <div className="container">
                        <div className="row w-100">
                            <a className="navbar-brand">Hacker News</a>
                            {!loading &&
                            <form className="col-sm-7 col-md-9">
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <input className="form-control w-100" placeholder="Search here.." value={query} onChange={this.handleSearch} />
                            </form>
                            }
                        </div>
                    </div>
                </nav>
                {loading ?
                    <Loader />
                    :
                    <div className="container">
                        {searchData && searchData.length ? this.renderSearchData() :  this.renderData()}
                    </div>
                }
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    const { stories, loading } = state.homeReducer;
    return { stories, loading };
}


const mapDispatchToProps = dispatch => {
    return {
        fetchStories: (value) => dispatch(fetchStories(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

