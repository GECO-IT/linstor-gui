import * as React from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@app/store';
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageHeader,
  PageSidebar,
  SkipToContent,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
} from '@patternfly/react-core';

import { Avatar, Dropdown, Menu, MenuProps } from 'antd';

import SVG from 'react-inlinesvg';

import { routes, IAppRoute, IAppRouteGroup } from '@app/routes/routes';

import HeaderAboutModal from './components/HeaderAboutModal';
import ConnectStatus from './components/ConnectStatus';
import LngSelector from './components/LngSelector';

import logo from '@app/bgimages/Linbit_Logo_White-1.png';
import logout from '@app/assets/logout.svg';
import user from '@app/assets/user.svg';

import './AppLayout.css';
import isSvg from 'is-svg';
import { ChangePassword, Login } from '@app/features/authentication';
import { ImgIcon } from './styled';
import { useUIModeStorage, usePersistentMenuState } from '@app/hooks';
import { useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DeploymentUnitOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { BRAND_COLOR } from '@app/const/color';

interface IAppLayout {
  children: React.ReactNode;
}

const hideRoutes = (label, routes) => {
  return routes.filter((route) => {
    if (route.routes) {
      return hideRoutes(label, route.routes);
    }
    return route.label !== label;
  });
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const AppLayout: React.FunctionComponent<IAppLayout> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = usePersistentMenuState(true);
  const [isMobileView, setIsMobileView] = useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = useState(false);
  const { UIMode, updateUIMode } = useUIModeStorage();
  const [selectedMenu, setSelectedMenu] = useState('/vsan/dashboard');
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory();

  const onModeChange = (mode) => {
    setIsNavOpen(true);
    updateUIMode(mode);
    dispatch.setting.setVSANMode(mode === 'VSAN');
    history.push(mode === 'VSAN' ? '/vsan/dashboard' : '/');
  };

  useEffect(() => {
    dispatch.auth.checkLoginStatus();
  }, [dispatch.auth]);

  const { KVS, authInfo, logoSrc, vsanModeFromSetting } = useSelector((state: RootState) => ({
    KVS: state.setting.KVS,
    authInfo: state.auth,
    logoSrc: state.setting.logo,
    vsanModeFromSetting: state.setting.vsanMode,
  }));
  // if authenticationEnabled is false then just enter the page
  const authenticationEnabled = KVS?.authenticationEnabled;

  useEffect(() => {
    const VSAN_URL = history.location.pathname.includes('/vsan');
    const initialOpenFromVSAN =
      history.location.pathname === '/vsan/dashboard' && history.location.search === '?vsan=true';

    if (initialOpenFromVSAN) {
      dispatch.setting.initSettingStore(VSAN_URL);
    }

    if (VSAN_URL) {
      dispatch.setting.setVSANMode(true);
    }
  }, [dispatch.setting, history.location.pathname, history.location.search]);

  useEffect(() => {
    dispatch.setting.getSettings();
  }, [dispatch.setting]);

  const { t } = useTranslation('menu');
  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };
  const onNavToggle = () => {
    setIsNavOpen && setIsNavOpen(!isNavOpen);
  };
  const onPageResize = (props: { mobileView: boolean; windowSize: number }) => {
    setIsMobileView(props.mobileView);
  };

  let filteredRoutes = KVS?.gatewayEnabled ? routes : routes.filter((route) => route.label !== 'gateway');

  if (!KVS?.gatewayEnabled) {
    filteredRoutes = hideRoutes('gateway', filteredRoutes);
  }

  if (!KVS?.dashboardEnabled) {
    filteredRoutes = hideRoutes('grafana', filteredRoutes);
  }

  const customizedLogo = isSvg(logoSrc as any) ? logoSrc : null;

  function LogoImg() {
    const history = useHistory();

    function handleClick() {
      history.push(vsanModeFromSetting && KVS?.vsanMode ? '/vsan/dashboard' : '/');
    }

    return (
      <>
        <img src={logo} className="logo" onClick={handleClick} alt="LINBIT Logo" />
        {'  '}
        {customizedLogo && <SVG src={customizedLogo} className="Customized Logo" />}
      </>
    );
  }

  const VSANAvailable = KVS?.vsanMode;
  const normalWithoutAuth = !VSANAvailable && !authenticationEnabled;

  const menu = {
    items: [
      {
        key: 'userinfo',
        label: (
          <a
            rel="noopener noreferrer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <ImgIcon src={user} alt="user" />
            <span>User: {authInfo.username}</span>
          </a>
        ),
        hidden: false,
      },
      {
        key: 'changepassword',
        label: <ChangePassword />,
        hidden: !authenticationEnabled,
      },
      {
        key: 'changemode',
        label: (
          <a
            rel="noopener noreferrer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onModeChange(UIMode === 'VSAN' ? 'NORMAL' : 'VSAN');
            }}
          >
            <DeploymentUnitOutlined rev={null} style={{ color: BRAND_COLOR, marginLeft: 2, marginRight: '1rem' }} />

            <span>{UIMode === 'VSAN' ? 'Switch to advanced mode' : 'Leave advanced mode'}</span>
          </a>
        ),
        hidden: !VSANAvailable,
      },
      {
        key: 'logout',
        label: (
          <a
            rel="noopener noreferrer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch.auth.logout();
            }}
          >
            <ImgIcon src={logout} alt="logout" />
            <span>Logout</span>
          </a>
        ),
        hidden: !authenticationEnabled,
      },
    ],
  };

  const headerTools = (
    <PageHeaderTools>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem>
          <ConnectStatus />
        </PageHeaderToolsItem>

        {!vsanModeFromSetting && (
          <PageHeaderToolsItem>
            <HeaderAboutModal />
          </PageHeaderToolsItem>
        )}

        {!vsanModeFromSetting && (
          <PageHeaderToolsItem>
            <LngSelector />
          </PageHeaderToolsItem>
        )}

        {!normalWithoutAuth && (
          <PageHeaderToolsItem>
            <Dropdown menu={menu} placement="bottom">
              <Avatar size={40} style={{ backgroundColor: '#f7a75c', color: '#1e2939', cursor: 'pointer' }}>
                {authInfo.username?.charAt(0).toUpperCase()}
              </Avatar>
            </Dropdown>
          </PageHeaderToolsItem>
        )}
      </PageHeaderToolsGroup>
    </PageHeaderTools>
  );

  const Header = (
    <PageHeader
      logo={<LogoImg />}
      showNavToggle
      headerTools={headerTools}
      isNavOpen={Boolean(isNavOpen)}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
    />
  );

  const location = useLocation();

  const renderNavItem = (route: IAppRoute, index: number) => (
    <NavItem key={`${route.label}-${index}`} id={`${route.label}-${index}`}>
      <NavLink exact={route.exact} to={route.path} activeClassName="pf-m-current">
        {t(`${route.label}`)}
      </NavLink>
    </NavItem>
  );

  const renderNavGroup = (group: IAppRouteGroup, groupIndex: number) => (
    <NavExpandable
      key={`${group.label}-${groupIndex}`}
      id={`${group.label}-${groupIndex}`}
      title={t(group.label)}
      isActive={group.routes.some((route) => route.path === location.pathname)}
    >
      {group.routes.map((route, idx) => route.label && renderNavItem(route, idx))}
    </NavExpandable>
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {filteredRoutes.map(
          (route, idx) => route.label && (!route.routes ? renderNavItem(route, idx) : renderNavGroup(route, idx))
        )}
      </NavList>
    </Nav>
  );

  const items: MenuItem[] = React.useMemo(() => {
    return [
      getItem(<a href="/#!/vsan/dashboard">Dashboard</a>, '/vsan/dashboard', <PieChartOutlined rev={null} />),
      getItem(
        <a href="/#!/vsan/physical-storage">Physical Storage</a>,
        '/vsan/physical-storage',
        <DesktopOutlined rev={null} />
      ),
      getItem(
        <a href="/#!/vsan/resource-groups">Resource Groups</a>,
        '/vsan/resource-groups',
        <ContainerOutlined rev={null} />
      ),
      getItem(<a href="/#!/vsan/iscsi">iSCSI</a>, '/vsan/iscsi', <MailOutlined rev={null} />),
      getItem(<a href="/#!/vsan/nvmeof">NVMe-oF</a>, '/vsan/nvmeof', <AppstoreOutlined rev={null} />),
      getItem(<a href="/#!/vsan/nfs">NFS</a>, '/vsan/nfs', <AppstoreOutlined rev={null} />),
      getItem(
        <a href="/#!/vsan/error-reports">Error Reports</a>,
        '/vsan/error-reports',
        <AppstoreOutlined rev={null} />
      ),
      getItem(<a href="/#!/vsan/users">Users</a>, '/vsan/users', <AppstoreOutlined rev={null} />),
      getItem(<a href="/#!/vsan/about">About</a>, '/vsan/about', <AppstoreOutlined rev={null} />),
    ];
  }, []);

  useEffect(() => {
    const currentMenu = items.find((e) => e?.key === location.pathname);
    if (currentMenu) {
      setSelectedMenu(currentMenu?.key as string);
    }
  }, [location, items]);

  const VSANNavigation = (
    <div>
      <Menu
        defaultSelectedKeys={[selectedMenu]}
        mode="inline"
        theme="dark"
        inlineCollapsed={false}
        items={items}
        style={{ backgroundColor: 'transparent' }}
        selectedKeys={[selectedMenu]}
      />
    </div>
  );

  const Sidebar = (
    <PageSidebar
      theme="dark"
      nav={vsanModeFromSetting ? VSANNavigation : Navigation}
      isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen}
    />
  );

  const pageId = 'primary-app-container';

  const PageSkipToContent = (
    <SkipToContent
      onClick={(event) => {
        event.preventDefault();
        const primaryContentContainer = document.getElementById(pageId);
        primaryContentContainer && primaryContentContainer.focus();
      }}
      href={`#${pageId}`}
    >
      Skip to Content
    </SkipToContent>
  );

  if (authenticationEnabled && !authInfo.isLoggedIn) {
    return (
      <>
        <Login />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={3}
        />
      </>
    );
  }

  return (
    <>
      <Page
        mainContainerId={pageId}
        header={Header}
        sidebar={Sidebar}
        onPageResize={onPageResize}
        skipToContent={PageSkipToContent}
      >
        {children}
      </Page>

      <ToastContainer
        position="top-right"
        autoClose={6000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={3}
      />
    </>
  );
};

export { AppLayout };
