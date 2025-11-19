import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '@/redux/selectors';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { Button } from '../button/button';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) return null;

	return (
		<div className={className}>
			<div className="overlay">modal</div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Delete
					</Button>
					<Button width="120px" onClick={onCancel}>
						Cancel
					</Button>
				</div>
			</div>
			<div className="modal-box">modal box</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;

	& .overlay {
		position: absolute;
		background: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}

	& .box {
		position: relative;
		width: 400px;
		top: 50%;
		margin: 0 auto;
		z-index: 30;
		transform: translate(0, -50%);
		background: #fff;
		border: 3px solid #000;
		border-radius: 8px;
		padding: 0 20px 20px;
		text-align: center;
	}

	& .buttons {
		display: flex;
		justify-content: center;
		gap: 20px;
	}
`;
