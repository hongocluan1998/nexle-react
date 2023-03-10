import React from 'react';
import AVT_ICON from 'asset/icons/avatar-icon.svg';
import { useProfile } from 'app/hooks/useProfile';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';
import LGOUT_ICON from 'asset/icons/logout-icon.svg';
import { useAppDispatch } from 'store/store';
import { logout } from 'store/slices/auth/authThunk';
import { LocalStorageService } from 'services';
import { useNavigate } from 'react-router-dom';
import path from 'app/routes/path';

function Header() {
  const userInfo = useProfile();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        LocalStorageService.removeAllItem();
        navigate(path.signIn);
      })
      .catch(() => {
        LocalStorageService.removeAllItem();
        navigate(path.signIn);
      });
  };
  return (
    <div className="d-flex justify-content-between position-fixed top-0 start-0 end-0 bg-light boxInfor">
      <div />
      <div className="d-flex" id="UncontrolledPopover">
        <div>
          <div className="text-dark fs14">{userInfo?.displayName}</div>
          <div className="text-info fs12">{userInfo?.email}</div>
        </div>
        <img className="ms-3" src={AVT_ICON} alt="Avatar icon" role="button" />
      </div>
      <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
        <PopoverBody
          className="text-info d-flex justify-content-end align-items-center popoverLogout"
          role="button"
          onClick={handleLogout}
        >
          Logout <img className="ms-3" src={LGOUT_ICON} alt="Logout icon." />
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

export default React.memo(Header);
