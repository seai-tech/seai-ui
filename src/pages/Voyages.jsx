import React, { useState, useEffect } from 'react';

function Voyages() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    const [searchInput, setSearchInput] = useState('');
    const [filteredRows, setFilteredRows] = useState([]);

    const data = [
        {
            id: 10,
            vesselName: 'INDIGO SUN',
            vesselType: 'Crude Oil',
            vesselFlag: 'LIBERIA',
            imoNumber: 9592288,
            rank: 'Master/Captain(CPT)',
            joiningPort: 'FAWLEY',
            joiningDate: '17/09/2023',
            leavingPort: 'NEW YORK',
            leavingDate: '25/01/2024'
        },
        {
            id: 9,
            vesselName: 'WHITE NOVA',
            vesselType: 'Crude Oil',
            vesselFlag: 'LIBERIA',
            imoNumber: 9326055,
            rank: 'Chief Officer (C/O)',
            joiningPort: 'YOSU',
            joiningDate: '05/02/2019',
            leavingPort: 'HONG KONG',
            leavingDate: '04/09/2019'
        }
    ];

    useEffect(() => {
        const filter = searchInput.toUpperCase();
        const filtered = data.filter((row) => {
            const vesselName = row.vesselName.toUpperCase();
            return vesselName.includes(filter);
        }
        );
        setFilteredRows(filtered);
    }, [searchInput]);

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
    };


    return (
        <main className="table">
            <section className="table-header">
                {userId ? (
                    <h1>Welcome, {userId} - Your Voyages</h1>
                ) : (
                    <h1>Your Voyages</h1>
                )}
                <div className="box">
                    <input type="text" id="searchInput" placeholder="Search by Vessel Name" value={searchInput} onChange={handleSearchChange} />
                    <a href="#"><i className="fas fa-search"></i></a>
                </div>
            </section>
            <section className="table-body">
                <table id="voyageTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vessel name</th>
                            <th>Vessel type</th>
                            <th>Vessel flag</th>
                            <th>IMO number</th>
                            <th>Rank</th>
                            <th>Joining port</th>
                            <th>Joining date</th>
                            <th>Leaving port</th>
                            <th>Leaving date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRows.map((row, index) => (
                            <tr key={index}>
                                <td>{row.id}</td>
                                <td>{row.vesselName}</td>
                                <td>{row.vesselType}</td>
                                <td>{row.vesselFlag}</td>
                                <td>{row.imoNumber}</td>
                                <td>
                                    <p className={`rank ${row.rank.split(' ')[0].toLowerCase()}`}>
                                        {row.rank}
                                    </p>
                                </td>
                                <td>{row.joiningPort}</td>
                                <td>{row.joiningDate}</td>
                                <td>{row.leavingPort}</td>
                                <td>{row.leavingDate}</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </section>

        </main>
    );

}

export default Voyages