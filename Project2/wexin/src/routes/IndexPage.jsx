import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import header_img from '../assets/header.jpg'
class IndexPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  render() {
    if (this.props.data.length === 0) {
      return false
    }
    return (
      <div className={styles.wrap}>
        <div className={styles.left}>
          <ul className={styles.user}>
            <li>
              <img src={header_img} alt="" />
            </li>
            <li>
              <i className="iconfont icon-xiaoxi"></i>
            </li>
            <li>
              <i className="iconfont icon-yonghu"></i>
            </li>
            <li>
              <i className="iconfont icon-bd-"></i>
            </li>
            <li>
              <i className="iconfont icon-sangang"></i>
            </li>
          </ul>
          <div className={styles.con}>
            <div className={styles.search}>
              <div>
                <i className="iconfont icon-ziyuanx"></i>
                搜索
            </div>
              <p>
                <i className="iconfont icon-hao"></i>
              </p>
            </div>
            <ul className={styles.userList}>
              {
                this.props.data.map((item, index) => {
                  return <li className={this.state.index === index ? styles.active : ''} key={index} onClick={() => { this.click(index) }}>
                    <p className={styles.con_img}> <img src={item[0].con_img} alt="" /></p>
                    <div className={styles.usercon}>
                      <div className={styles.usercon_top}>
                        <p className={styles.userlistname}>{item[0].name}</p>
                        <span className={styles.time}>{item[0].time}</span>
                      </div>
                      <div className={styles.usercon_bottom}>
                        <p className={styles.username}>{item[0].con}</p>
                        <span className={styles.remind}></span>
                      </div>
                    </div>
                  </li>
                })
              }
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightTop}>
            <ul className={styles.head_num}>
              <li>
                <span className="iconfont icon-heng"></span>
              </li>
              <li>
                <span className="iconfont icon-zhengfangxing"></span>
              </li>
              <li>
                <span className="iconfont icon-guanbi"></span>
              </li>
            </ul>
            <div className={styles.title}>
              <h2>{this.props.data[this.state.index][0].name}</h2>
              <p>
                <span className="iconfont icon-gengduo"></span>
              </p>
            </div>
          </div>
          <div className={styles.right_top}>
            {
              this.props.data[this.state.index].map((item, index) => {
                return <div className={item.pos === 1 ? styles.userValue : styles.myself} key={index}>
                  <p className={styles.suerImg}>
                    <img src={item.con_img} alt="" />
                  </p>
                  <div className={styles.userContent}>
                    <p>{item.name}</p>
                    <p>{item.content}</p>
                  </div>
                </div>
              })
            }
          </div>
          <div className={styles.dialogue}>
            <div className={styles.dialogueTop}>
              <ul>
                <li>
                  <span className="iconfont icon-pxliaotianfabiaoqing-yigai"></span>
                </li>
                <li>
                  <span className="iconfont icon-cloud-folder"></span>
                </li>
                <li>
                  <span className="iconfont icon-jiandao"></span>
                </li>
                <li>
                  <span className="iconfont icon-xiaoxi"></span>
                </li>
              </ul>
              <p>
                <span className="iconfont icon-icon-"></span>
              </p>
            </div>
            <textarea className={styles.sendCon} ref="my"></textarea>
            <button className={styles.btn} onClick={() => { this.myValue(this.state.index) }}>发送(s)</button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.getData()
    console.log()
  }
  click(ind) {
    this.setState({
      index: ind
    })
    this.refs.my.value = ''
  }
  myValue(ind) {
    console.log(ind, this.refs.my.value)
    this.props.data[ind].push({
      name: "张舒童",
      pos: 2,
      con_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541429054762&di=1680a9ff41b5dc509124f70d3dd561a2&imgtype=0&src=http%3A%2F%2Flife.southmoney.com%2Ftuwen%2FUploadFiles_6871%2F201808%2F20180809115818693.jpg",
      time: "昨天",
      con: "",
      content: this.refs.my.value
    })
    this.refs.my.value = ''
  }
}

const mapStateToProps = state => {
  return {
    data: state.index.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getData: type => {
      dispatch({
        type: 'index/fetch',
        payload: type
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
