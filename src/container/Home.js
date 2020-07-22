import React from 'react';
import { connect } from 'react-redux';
import { fetchStories } from '../store/actions'
import Card from '../component/Card';
import Footer from '../component/Footer';
import Modal  from '../component/Modal';
import {BgImgs,Tags } from '../data/Data'
import Loader from '../component/Loader';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            data: [],
            searchData: [],
            bgImgs:BgImgs,
            selectedBgImg:'',
            isModalOpen: false,
            searchInput:'',
            dataPerPage:9
        }
    }
    componentDidMount() {
              this.props.fetchStories();
              const lenght = this.state.bgImgs.length;
              const random = Math.floor(Math.random() * lenght);
              this.setState({ selectedBgImg: this.state.bgImgs[random] });
    }
    componentDidUpdate(prevProps) {
        const stories = this.props.stories;
        if (stories !== prevProps.stories) {
            this.setState({ data: stories });
        }
    }
    handleSearchInput = (e) => {
        this.setState({searchInput: e.target.value});
    }
    submitSearchQuery = () =>{
        this.props.fetchStories(this.state.searchInput);
    }
    onTagSearch = (query) => {
        this.setState({searchInput: query},() => this.submitSearchQuery());
    }
    handleDataPerPage = () => {
        this.setState((prevState) =>({dataPerPage: prevState.dataPerPage + 9}));
    }
    openModalHandler = () => {
        this.setState({isModalOpen: true});
      }
      closeModalHandler = () => {
        this.setState({isModalOpen: false});
      }

    render() {
        const loading = this.props.loading;
        console.log('loading ', loading);
        const { isModalOpen, selectedBgImg, searchInput, data,dataPerPage } = this.state;
        return (
            
            <main className="main-container">
            { isModalOpen ? <div onClick={this.closeModalHandler} className="back-shed"></div> : null }
            <Modal
              className="modal"
              show={isModalOpen}
              close={this.closeModalHandler}>
            </Modal>
                <section className="big-hero-section" style={{backgroundImage: "url(" + selectedBgImg + ")",}}>
                    <div className="content">
                        <div className="top-section">
                            <h1 className="logo">Search<span className="primary-color">it</span></h1>
                            <h1 className="sub">Free stock photos for everything</h1>
                            <p>We offer the best free stock photos all in one place</p>
                            <div className="tag-wrapper">
                                <h6>Search by tags:</h6>
                                <div>
                                {Tags.map( (item,index) => (
                                    <a key={index} onClick={() => this.onTagSearch(item)} className="link">{item}</a>
                                ))}
                                </div>
                            </div>
                            <div className="search-box-wrapper">
                                <input placeholder="Search for images here..." value={searchInput} onChange={this.handleSearchInput}/>
                                <button className="btn primary rounded" onClick={this.submitSearchQuery}><img src='/img/search-icon.svg' /></button>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="content flex">
                {
                    !loading ?
                    <React.Fragment>
                    <div className="gallary-wrapper">
                    {data && data.length ?
                        <React.Fragment>
                    { data.slice(0,dataPerPage).map( (item,index) => (
                        <Card 
                            thumb={item?.urls?.thumb}
                            userName={item?.user?.name}
                            userImg={item?.user?.profile_image?.small}
                            openModalHandler={this.openModalHandler}
                        />
                    ))}

                    </React.Fragment>
                    : <h1 className="no-data-text"> Not Data Found </h1>
                    }             
                    </div>
                    {data && data.length && <div className="load-btn-wrapper">
                    <button className="btn primary" onClick={this.handleDataPerPage}>Load More</button>
                    </div>}
                    </React.Fragment>
                    : <Loader/>
                    
                }
                    
                </div>
            <Footer/>



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

