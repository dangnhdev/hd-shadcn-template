# Better-Auth-Ui - Api-Reference

**Pages:** 16

---

## UserButtonClassNames

**URL:** https://better-auth-ui.com/api-reference/user-button-class-names

**Contents:**
- UserButtonClassNames

The following class names can be passed to the <UserButton /> component to customize the appearance of the user button:

SettingsCardClassNames

---

## AuthView

**URL:** https://better-auth-ui.com/api-reference/auth-view

**Contents:**
- AuthView
- Available Options

The AuthView type defines the available authentication views.

The following authentication views are supported:

---

## AdditionalField

**URL:** https://better-auth-ui.com/api-reference/additional-field

**Contents:**
- AdditionalField

Below is the AdditionalField interface which allows you to define custom fields for your authentication flow such as signup or user settings.

---

## AuthFormClassNames

**URL:** https://better-auth-ui.com/api-reference/auth-form-class-names

**Contents:**
- AuthFormClassNames

The following class names can be passed to the <AuthCard /> component to customize the appearance of the Auth form:

---

## FetchError

**URL:** https://better-auth-ui.com/api-reference/fetch-error

**Contents:**
- FetchError

The FetchError type represents an error object returned from authentication or API requests.

---

## AuthMutators

**URL:** https://better-auth-ui.com/api-reference/auth-mutators

**Contents:**
- AuthMutators

The AuthMutators interface defines mutation functions for updating authentication state, such as updating the user, revoking sessions, and more.

---

## AuthLocalization

**URL:** https://better-auth-ui.com/api-reference/auth-localization

**Contents:**
- AuthLocalization

You can customize the text and messages displayed by the authentication components by providing an AuthLocalization object to the <AuthUIProvider /> component.

---

## AdditionalFields

**URL:** https://better-auth-ui.com/api-reference/additional-fields

**Contents:**
- AdditionalFields
- Usage
- AdditionalField

The AdditionalFields interface allows you to define custom fields for your authentication flow such as signup or user settings.

You can configure additionalFields like this:

**Examples:**

Example 1 (unknown):
```unknown
<AuthUIProvider
  authClient={authClient}
  additionalFields={{
    age: {
      label: "Age",
      placeholder: "Your age",
      description: "Enter your age",
      required: true,
      type: "number"
    },
    newsletter: {
      label: "Newsletter Opt-In",
      description: "Subscribe to the newsletter",
      required: false,
      type: "boolean",
    }
  }}
>
  {children}
</AuthUIProvider>
```

---

## Profile

**URL:** https://better-auth-ui.com/api-reference/profile

**Contents:**
- Profile

The Profile type represents a user profile object, used for displaying user information in the UI.

---

## UserAvatarClassNames

**URL:** https://better-auth-ui.com/api-reference/user-avatar-class-names

**Contents:**
- UserAvatarClassNames

The following class names can be passed to the <UserAvatar /> component to customize the appearance of the user avatar:

---

## AuthViewPaths

**URL:** https://better-auth-ui.com/api-reference/auth-view-paths

**Contents:**
- AuthViewPaths

You can customize the paths for the authentication views by providing an AuthViewPaths object to the <AuthUIProvider /> component.

---

## AuthViewClassNames

**URL:** https://better-auth-ui.com/api-reference/auth-view-class-names

**Contents:**
- AuthViewClassNames

The following class names can be passed to the <AuthView /> component to customize the appearance of the Auth cards:

---

## EmailTemplateClassNames

**URL:** https://better-auth-ui.com/api-reference/email-template-class-names

**Contents:**
- EmailTemplateClassNames

The following class names can be passed to the <EmailTemplate /> component to customize the appearance of the Email Template:

SettingsCardClassNames

---

## ModelNames

**URL:** https://better-auth-ui.com/api-reference/model-names

**Contents:**
- ModelNames
- InstantDB
- Triplit

The ModelNames type defines the mapping of model namespaces to their string names for use with InstantDB and Triplit integrations.

---

## SettingsCardClassNames

**URL:** https://better-auth-ui.com/api-reference/settings-card-class-names

**Contents:**
- SettingsCardClassNames

The following class names can be passed to a Settings Card component to customize the appearance:

EmailTemplateClassNames

---

## AuthHooks

**URL:** https://better-auth-ui.com/api-reference/auth-hooks

**Contents:**
- AuthHooks

The AuthHooks type defines the set of authentication-related hooks used by the UI provider and components.

---
