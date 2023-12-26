import React, { useContext } from 'react'
import { StoreContext } from 'stores/Store';

import './style.css'
export default function Rightbar() {
    const { user, fab, modalOpen, setModalOpen, postType, setPostType } = useContext(StoreContext)

    const fabClick = () => {
        setModalOpen(!modalOpen)
    }
    return (
        <>
            {user && (
                <div className="rigth_bar">
                    <div className="fab" onClick={fabClick}>
                        {
                            postType.type === 'answer' ||
                                postType.type === 'answerEdit' ||
                                postType.type === 'userThreadEdit' ||
                                postType.type === 'adminThreadEdit'
                                ? (
                                    <>
                                        <span>{"Answer"}</span>
                                        <i className="bx bx-pencil" />
                                    </>
                                ) : postType.type === 'upload' || postType.type === 'fileEdit' ? (
                                    <>
                                        <span>{"New File"}</span>
                                        <i className="bx bx-cloud-upload" />
                                    </>
                                ) : (
                                    <>
                                        <span>{"Create New"}</span>
                                        <i className="bx bx-pencil" />
                                    </>
                                )}
                    </div>
                </div>
            )}</>
    )
}
