from django.test import TestCase


class BasicTest(TestCase):
    def test_basic(self):
        """Basic test to ensure testing works"""
        self.assertEqual(1, 1)

    def test_dummy(self):
        self.assertTrue(False)
