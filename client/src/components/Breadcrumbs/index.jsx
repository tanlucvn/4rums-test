import { Link } from 'react-router-dom';

import './style.css';

// import icons
import { CaretRight } from "@phosphor-icons/react";

export default function Breadcrumbs({ current, links }) {
    return (
        <div className="breadcrumbs">
            <div className="breadcrumbBody">
                {links.map((item, index) => (
                    <div key={index} className="breadcrumbsItem">
                        <Link className="breadcrumbsLink" to={item.link}>{item.title}</Link>
                        <CaretRight className='breadcrumbsIcon' />
                    </div>
                ))}
                <div className="breadcrumbs_item">{current}</div>
            </div>
        </div>
    )
}
