 <div className="videopager">
                <span className="prevvid nav_vids" onClick={this.prevVid}>
                  <FontAwesomeIcon className="fa-bw" icon={faStepBackward} />
                </span>
                {this.props.content.videos.map((video, key) => (
                  <span
                  key={key}
                    className={
                      this.state.curVideo === key
                        ? "indicator active"
                        : "indicator"
                    }
                  >
                    <FontAwesomeIcon className="fa-circle" icon={faCircle} />
                  </span>
                ))}
                <span className="nextvid nav_vids" onClick={this.nextVid}>
                  <FontAwesomeIcon className="fa-fw" icon={faStepForward} />
                </span>
              </div>