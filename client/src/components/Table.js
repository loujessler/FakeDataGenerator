import React from 'react';

const Table = ({ data }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>uuid</th>
                    <th>name</th>
                    <th>address</th>
                    <th>phone</th>
                </tr>
                </thead>
                <tbody>
                {data.map((user, index) => (
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.uuid}</td>
                        <td>{user.name}</td>
                        <td>{user.address}</td>
                        <td>{user.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
