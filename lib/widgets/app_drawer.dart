import 'package:flutter/material.dart';

import '../screens/connection_failed_screen.dart';
import '../theme.dart';

/// The yellow slide-out drawer. "Courses" is the live screen; every other
/// entry runs the offline connection-failed flow.
class AppDrawer extends StatelessWidget {
  const AppDrawer({super.key});

  // Static profile shown at the top of the drawer.
  static const _displayName = 'Mohammad Ali Mohammad';
  static const _email = 'uer7951@edu.kunskapsgymna...';

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColors.yellow,
      shape: const RoundedRectangleBorder(),
      child: SafeArea(
        child: Column(
          children: [
            const SizedBox(height: 18),
            _profile(),
            const SizedBox(height: 10),
            _item(
              context,
              icon: Icons.school_outlined,
              label: 'Courses',
              selected: true,
              onTap: () => Navigator.of(context).pop(),
            ),
            _item(
              context,
              icon: Icons.calendar_month_outlined,
              label: 'Calendar',
              onTap: () => _fail(context, 'Calendar'),
            ),
            _item(
              context,
              icon: Icons.chat_bubble_outline,
              label: 'Communication',
              onTap: () => _fail(context, 'Communication'),
            ),
            _item(
              context,
              icon: Icons.collections_bookmark_outlined,
              label: 'Bulletin Board',
              onTap: () => _fail(context, 'Bulletin Board'),
            ),
            const Spacer(),
            const Padding(
              padding: EdgeInsets.only(right: 24, bottom: 8),
              child: Align(
                alignment: Alignment.centerRight,
                child: Text(
                  'v1.2.0',
                  style: TextStyle(color: Color(0x88000000), fontSize: 14),
                ),
              ),
            ),
            const Divider(height: 1, color: Color(0x22000000)),
            _item(
              context,
              icon: Icons.logout,
              label: 'Log out',
              onTap: () => _fail(context, 'Log out'),
            ),
            const SizedBox(height: 12),
          ],
        ),
      ),
    );
  }

  void _fail(BuildContext context, String title) {
    Navigator.of(context).pop(); // close drawer first
    openConnectionFailed(context, title);
  }

  Widget _profile() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 8),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 30,
            backgroundColor: AppColors.avatarPurple,
            child: Text(
              'M',
              style: TextStyle(
                color: Colors.white,
                fontSize: 26,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  _displayName,
                  style: const TextStyle(
                    color: AppColors.dark,
                    fontSize: 19,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  _email,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: Color(0xCC000000),
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _item(
    BuildContext context, {
    required IconData icon,
    required String label,
    required VoidCallback onTap,
    bool selected = false,
  }) {
    return Material(
      color: selected ? AppColors.drawerSelected : Colors.transparent,
      child: InkWell(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 18),
          decoration: const BoxDecoration(
            border: Border(
              bottom: BorderSide(color: Color(0x22000000), width: 1),
            ),
          ),
          child: Row(
            children: [
              Icon(icon, color: AppColors.dark, size: 28),
              const SizedBox(width: 22),
              Text(
                label,
                style: const TextStyle(
                  color: AppColors.dark,
                  fontSize: 20,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
