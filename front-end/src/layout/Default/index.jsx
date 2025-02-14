import React from 'react';
import Header from './Header';
function DefaultLayout({children}) {
    return (
        <div>
            <Header />
            <div className="container mx-auto">
                {children}
            </div>
        </div>
    );
}

export default DefaultLayout;