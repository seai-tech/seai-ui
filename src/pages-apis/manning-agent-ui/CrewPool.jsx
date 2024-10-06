import React, { useEffect, useState, useContext, useRef } from 'react';

const CrewPool =()=>{
    return(
        <>
        <div className="crew-pool-container">   
        <header className="crew-pool-header">
            <h1>Crew Pool</h1>
        </header>  
        <div className="crew-pool-searchbox">
                    <input type="text" id="searchInput" placeholder="Search" />
                    <a href="#"><i className="fas fa-search"></i></a>
        </div>
        <div className="crew-pool-filters">
            <div className="crew-pool-filter-item">
                <label>Fleet:</label>
                <div className="scrollable-list" id="fleet-list">                   
                    <ul>
                        <li>Fleet 1</li>
                        <li>Fleet 2</li>
                        <li>Fleet 3</li>
                        <li>Fleet 4</li>
                    </ul>
                </div>
            </div> 
            <div className="crew-pool-filter-item">
            <label>Rank:</label>
                <div className="scrollable-list" id="rank-list">                
                    <ul>
                        <li>Rank 1</li>
                        <li>Rank 2</li>
                        <li>Rank 3</li>
                        <li>Rank 4</li>
                    </ul>
                </div>
            </div>
            <div className="crew-pool-filter-item">
                <label for="status-select">Status:</label>
                <select id="status-select">
                    <option value="available">Available</option>
                    <option value="on-leave">On Leave</option>
                    <option value="deployed">Deployed</option>
                </select>
            </div>
        </div>    
        <div className="crew-pool-filters">
            <div className="crew-pool-filter-item">
                <label>Manning Agent:</label>
                <div class="scrollable-list" id="manning-agent-list">      
                    <ul>
                        <li>Agent 1</li>
                        <li>Agent 2</li>
                        <li>Agent 3</li>
                        <li>Agent 4</li>
                    </ul>
                </div>
            </div>
            <div className="crew-pool-filter-item">
                <label>Nationality:</label>
                <div className="scrollable-list" id="nationality-list"> 
                    <ul>
                        <li>Nationality 1</li>
                        <li>Nationality 2</li>
                        <li>Nationality 3</li>
                        <li>Nationality 4</li>
                    </ul>
                </div>
            </div>
            <div className="crew-pool-filter-item">
                <label for="location-select">Location:</label>
                <select id="location-select">
                    <option value="location1">Location 1</option>
                    <option value="location2">Location 2</option>
                    <option value="location3">Location 3</option>
                </select>
            </div>
        </div>       
        <div className="go-reset-button-container">
            <button id="go-button">GO</button>
            <button id="reset-button">Reset</button>
        </div>     
        <div className="crew-table">
            <table>
                <thead>
                    <tr>
                        <th>Fleet</th>
                        <th>Person</th>
                        <th>Rank</th>
                        <th>Agent</th>
                        <th>Nationality</th>
                        <th>Last Vessel</th>
                        <th>Sign Off</th>
                        <th>Ready Join</th>
                        <th>Exp</th>
                        <th>Next Assignment</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>                
                    <tr>
                        <td>Fleet 1</td>
                        <td>Person1</td>
                        <td>Rank 1</td>
                        <td>Agent 1</td>
                        <td>Nationality 1</td>
                        <td>Last Vessel 1</td>
                        <td>sign off</td>
                        <td>31/12/2022</td>
                        <td>13.19</td>
                        <td>Celeste Nova</td>
                        <td>no remarks</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="crew-pool-cards-container">
        <div className="crew-pool-card">
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Fleet: </span>
                    <span className="crew-pool-card-value">Fleet 1</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Person:</span>
                    <span className="crew-pool-card-value">Person 1</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Rank: </span>
                    <span className="crew-pool-card-value">Rank 1</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Manning Agent: </span>
                    <span className="crew-pool-card-value">Agent 1</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Nationality: </span>
                    <span className="crew-pool-card-value">Nationality 1</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Last Vessel:</span>
                    <span className="crew-pool-card-value">Last Vessel 1</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Sign Off</span>
                    <span className="crew-pool-card-value">sign off</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Ready Join</span>
                    <span className="crew-pool-card-value">31/12/2022</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Exp</span>
                    <span className="crew-pool-card-value">13.19</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Next Assignment</span>
                    <span className="crew-pool-card-value">Celeste Nova</span>
                    </div>
                    <div className="crew-pool-card-item">
                    <span className="crew-pool-card-label">Remarks</span>
                    <span className="crew-pool-card-value">no remarks</span>
                    </div>
                </div>
        </div>
        
    </div>
</>
)};

export default CrewPool;