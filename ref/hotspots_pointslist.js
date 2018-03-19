<Hotspot  
                    type={hotspot.type}
                    active={this.state.activeKey === hotspot.id? true : false}
                    onClick={this.hpState.bind(this, hotspot.id, hotspot.position, hotspot.type)}
                    close={this.close.bind(this, hotspot.id)} 
                    scene={this.state.scene} 
                    key={hotspot.id} 
                    title={hotspot.title} 
                    content={hotspot.content}
                    data={hotspot.data} 
                    keyword={hotspot.keyword} 
                    position={hotspot.position}/>  
          <PointsList 
                  activeKey={this.state.activeKey}
                  hotspots={this.props.hotspots}
                  setPos={this.setPos.bind(this)}
                  hotspotType={this.state.hotspotType}
                  
          />