export interface authenticatedProps {
  authenticated: boolean
}

export interface settingsProps extends authenticatedProps {
  handleCloseUserMenu: any
}